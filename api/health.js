export default function handler(request, response) {
  response.status(200).json({ 
    status: 'ok', 
    message: 'SkillBridge Backend API is working',
    timestamp: new Date().toISOString(),
    service: 'SkillBridge Backend',
    version: '1.0.0'
  });
}