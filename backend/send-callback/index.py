import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправляет заявку на обратную связь (имя + телефон) на почту vikingremspb@gmail.com"""
    cors_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors_headers, 'body': ''}

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()

    if not name or not phone:
        return {
            'statusCode': 400,
            'headers': cors_headers,
            'body': json.dumps({'error': 'Имя и телефон обязательны'})
        }

    smtp_password = os.environ.get('SMTP_PASSWORD', '')
    sender = 'vikingremspb@gmail.com'
    recipient = 'vikingremspb@gmail.com'

    msg = MIMEMultipart('alternative')
    msg['Subject'] = 'Новая заявка на обратную связь — VikingRemont'
    msg['From'] = sender
    msg['To'] = recipient

    html = f"""
    <html><body style="font-family: Arial, sans-serif; padding: 20px;">
      <h2 style="color: #333;">Новая заявка с сайта VikingRemont</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 400px;">
        <tr>
          <td style="padding: 8px; background: #f5f5f5; font-weight: bold; border: 1px solid #ddd;">Имя</td>
          <td style="padding: 8px; border: 1px solid #ddd;">{name}</td>
        </tr>
        <tr>
          <td style="padding: 8px; background: #f5f5f5; font-weight: bold; border: 1px solid #ddd;">Телефон</td>
          <td style="padding: 8px; border: 1px solid #ddd;">{phone}</td>
        </tr>
      </table>
    </body></html>
    """

    msg.attach(MIMEText(html, 'html'))

    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
        server.login(sender, smtp_password)
        server.sendmail(sender, recipient, msg.as_string())

    return {
        'statusCode': 200,
        'headers': cors_headers,
        'body': json.dumps({'ok': True})
    }
