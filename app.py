from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import dns.resolver
import whois
import ssl
import socket
import nmap
from vulners import Vulners
from bs4 import BeautifulSoup
import requests
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token
from pymongo import MongoClient
from bson.objectid import ObjectId

#login 

#loginend

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
# CORS(app, resources={r"/api/*": {"origins": "*"}})  # `origins` ga "*" qo'shishni ko'rib chiqing

# MongoDB ulanishi
client = MongoClient('mongodb://localhost:27017/')
db = client['pentester_helper']
checks_collection = db['checks']

# DNS ma'lumotlarini olish funksiyasi
def get_dns_info(url):
    dns_resolver = dns.resolver.Resolver()
    records = {}
    try:
        for rtype in ['A', 'AAAA', 'MX', 'NS', 'TXT']:
            answers = dns_resolver.resolve(url, rtype, raise_on_no_answer=False)
            records[rtype] = [str(r) for r in answers]
    except Exception as e:
        records['error'] = str(e)
    return records

# WHOIS ma'lumotlarini olish funksiyasi
def get_whois_info(url):
    try:
        domain_info = whois.whois(url)
        relevant_info = {
            'domain_name': domain_info.domain_name,
            'registrar': domain_info.registrar,
            'creation_date': domain_info.creation_date,
            'expiration_date': domain_info.expiration_date,
            'name_servers': domain_info.name_servers,
        }
        return relevant_info
    except Exception as e:
        return {'error': str(e)}

# SSL sertifikat ma'lumotlarini olish funksiyasi
def get_ssl_info(url):
    ssl_info = {}
    try:
        hostname = url
        context = ssl.create_default_context()
        with socket.create_connection((hostname, 443)) as sock:
            with context.wrap_socket(sock, server_hostname=hostname) as ssock:
                cert = ssock.getpeercert()
                ssl_info['subject'] = dict(x[0] for x in cert['subject'])
                ssl_info['issuer'] = dict(x[0] for x in cert['issuer'])
                ssl_info['valid_from'] = cert['notBefore']
                ssl_info['valid_to'] = cert['notAfter']
    except Exception as e:
        ssl_info['error'] = str(e)
    return ssl_info
#Portlarni va Xizmatlarni Tekshirish Funksiyasi:
def get_open_ports_and_services(url):
    nm = nmap.PortScanner()
    scan_result = {}
    try:
        nm.scan(url, '1-1024')  # 1-1024 oraliqdagi portlarni skanerlash
        for host in nm.all_hosts():
            scan_result[host] = {
                'hostnames': nm[host].hostname(),
                'ports': [
                    {'port': port, 'service': nm[host]['tcp'][port]['name']}
                    for port in nm[host]['tcp']
                ]
            }
    except Exception as e:
        scan_result['error'] = str(e)
    return scan_result

#Zaifliklarni Tekshirish Funksiyasi
def get_vulnerabilities(url):
    vulners = Vulners(api_key="YOUR_VULNERS_API_KEY")
    vulnerabilities = {}
    try:
        # 'search' metodidan foydalanamiz
        data = vulners.search('host:%s' % url)
        vulnerabilities = data.get('result', {}).get('vulnerabilities', {})
    except Exception as e:
        vulnerabilities['error'] = str(e)
    return vulnerabilities

# Qora Ro'yxat Tekshiruvi Funksiyasi:
def check_blacklist(url):
    blacklist_info = {}
    try:
        response = requests.get(f'https://urlscan.io/api/v1/search/?q=domain:{url}')
        blacklist_info = response.json()
    except Exception as e:
        blacklist_info['error'] = str(e)
    return blacklist_info
# Subdomenlarni olish funksiyasi
def get_subdomains(url):
    # Bu yerda subdomenlarni olish uchun dasturiy ta'minot kerak (masalan, subbrute yoki passivedns)
    subdomains = ['sub1.example.com', 'sub2.example.com']  # Misol uchun, to'liq implementatsiya yo'q
    return subdomains

#Trafik va Xavfsizlik Xulosalari Funksiyasi:
def get_security_insights(url):
    security_insights = {}
    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')

        # Misol uchun: barcha script teglarini ko'rib chiqish
        scripts = soup.find_all('script')
        security_insights['scripts'] = [str(script) for script in scripts]

        # Shu yerda yana boshqa xavfsizlik tekshiruvlarini qo'shish mumkin
    except Exception as e:
        security_insights['error'] = str(e)
    return security_insights



@app.route('/api/check', methods=['POST'])
def check_website():
    url = request.json.get('url')
    if not url:
        return jsonify({'message': 'URL kiritilmadi!'}), 400

    # Yangi funksiyalarni chaqirish
    dns_info = get_dns_info(url)
    whois_info = get_whois_info(url)
    ssl_info = get_ssl_info(url)
    subdomains = get_subdomains(url)
    open_ports = get_open_ports_and_services(url)
    vulnerabilities = get_vulnerabilities(url)
    blacklist_info = check_blacklist(url)
    security_insights = get_security_insights(url)

    # Ma'lumotlarni yig'ish
    result = {
        'url': url,
        'status': 'Tekshirildi',
        'dns_info': dns_info,
        'whois_info': whois_info,
        'ssl_info': ssl_info,
        'subdomains': subdomains,
        'open_ports': open_ports,
        'vulnerabilities': vulnerabilities,
        'blacklist_info': blacklist_info,
        'security_insights': security_insights,
        'issues': []  # Tahlil natijalarini kiritish mumkin
    }

    # Natijani MongoDB'ga saqlash
    insert_result = checks_collection.insert_one(result)

    # MongoDB'dan qaytgan ObjectId ni string ga o'zgartirish
    result['_id'] = str(insert_result.inserted_id)

    return jsonify({'message': f'{url} tekshirildi va saqlandi!', 'result': result}), 200

# # Zaiflikni emulyatsiya qilish
# @app.route('/api/attack', methods=['POST'])
# def attack():
#     security_level = request.args.get('level')
    
#     if security_level == 'low':
#         message = "Zaiflik aniqlandi! SQL injection hujumi."
#     elif security_level == 'medium':
#         message = "O'rta darajadagi zaiflik! XSS hujumi amalga oshdi."
#     elif security_level == 'high':
#         message = "Himoya darajasi yuqori, zaiflik aniqlanmadi!"
#     else:
#         message = "Noma'lum daraja!"
    
#     return jsonify({"message": message})

# # Himoya kodini ko'rsatish
# @app.route('/api/code', methods=['GET'])
# def get_code():
#     security_level = request.args.get('level')
    
#     if security_level == 'low':
#         code = """
#         def low_level_protection():
#             # Zaif himoya kodi
#             user_input = request.args.get('input')
#             # SQL injectionga qarshi himoya yo'q
#             execute_sql("SELECT * FROM users WHERE id=" + user_input)
#         """
#     elif security_level == 'medium':
#         code = """
#         def medium_level_protection():
#             # O'rta darajadagi himoya kodi
#             user_input = request.args.get('input')
#             # Faqat XSSdan himoya, SQL injectionga qarshi himoya hali yo'q
#             sanitized_input = sanitize_html(user_input)
#             execute_sql("SELECT * FROM users WHERE id=" + sanitized_input)
#         """
#     elif security_level == 'high':
#         code = """
#         def high_level_protection():
#             # Yuqori darajadagi himoya kodi
#             user_input = request.args.get('input')
#             # SQL injection va XSSga qarshi to'liq himoya
#             query = "SELECT * FROM users WHERE id=%s"
#             execute_sql(query, (user_input,))
#         """
#     else:
#         code = "Noma'lum daraja!"

#     return jsonify({"code": code})


if __name__ == '__main__':
    app.run(debug=True)
