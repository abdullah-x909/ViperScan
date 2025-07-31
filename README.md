# 🐍 ViperScan

<div align="center">
  <img src="🐍" alt="ViperScan" width="200">
  
  <p>A powerful, open-source web security testing platform for ethical hackers and bug bounty hunters.</p>

  ![License](https://img.shields.io/badge/license-MIT-blue.svg)
  ![Version](https://img.shields.io/badge/version-0.1.0-green.svg)
  ![Status](https://img.shields.io/badge/status-alpha-orange.svg)
</div>

## 🚀 Features

- 🔍 **Real-time Intercepting Proxy**
  - Capture and modify HTTP/HTTPS traffic
  - WebSocket support
  - Request/response modification
  - Advanced filtering capabilities

- 🎯 **Vulnerability Scanner**
  - Active and passive scanning modes
  - OWASP Top 10 detection
  - Custom scan profiles
  - Detailed vulnerability reports

- 🔄 **Request Repeater**
  - Multi-tab request workspace
  - History tracking
  - Response comparison
  - Custom header management

- 💥 **Advanced Fuzzer**
  - Integration with ffuf
  - Custom payload lists
  - Parameter discovery
  - Rate limiting and threading options

- 📝 **Comprehensive Logger**
  - Detailed request logs
  - Export capabilities
  - Advanced filtering
  - Real-time monitoring

- 🛠️ **Tools Integration**
  - sqlmap
  - nmap
  - nikto
  - dirsearch
  - wappalyzer
  - Custom tool support

## 🎨 Screenshots

<div align="center">
  <img src="https://raw.githubusercontent.com/abbdullah-x909/viperscan/main/assets/proxy-tab.png" alt="Proxy Tab" width="800">
  <p><em>Proxy Interceptor with Request/Response Modification</em></p>
  
  <img src="https://raw.githubusercontent.com/abdullah-x909/viperscan/main/assets/scanner-tab.png" alt="Scanner Tab" width="800">
  <p><em>Vulnerability Scanner Dashboard</em></p>

  <img src="https://raw.githubusercontent.com/abdullah-x909/viperscan/main/assets/tools-tab.png" alt="Scanner Tab" width="800">

<img src="https://raw.githubusercontent.com/abdullah-x909/viperscan/main/assets/repeater-tab.png" alt="Scanner Tab" width="800">

</div>

## 🔧 Installation

### Prerequisites

- Node.js 18+
- Python 3.8+ (for tool integrations)
- Git

### Quick Start

```bash
# Clone the repository
git clone https://github.com/abdullah-x909/ViperScan.git

# Navigate to project directory
cd viperscan

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Tool Integration Setup

```bash
# Install required security tools
sudo apt install sqlmap nmap nikto ffuf

# Configure tool paths in settings
Settings > External Tools > Configure Paths
```

## 🚦 Usage

1. **Proxy Setup**
   - Configure your browser to use ViperScan's proxy (default: 127.0.0.1:8080)
   - Install and trust the ViperScan CA certificate
   - Start capturing traffic

2. **Scanning**
   - Enter target URL
   - Select scan profile
   - Review results in real-time

3. **Fuzzing**
   - Create or import payload lists
   - Configure fuzzing parameters
   - Monitor results

4. **Tools**
   - Integrate external security tools
   - Configure custom tools
   - Manage tool settings

## 🛡️ Security Features

- **Request Interception**
  - Real-time traffic modification
  - Custom rules and filters
  - Automatic encoding/decoding

- **Vulnerability Detection**
  - SQL Injection
  - Cross-Site Scripting (XSS)
  - Command Injection
  - File Inclusion
  - SSRF
  - And more...

- **Reporting**
  - Detailed vulnerability reports
  - Evidence collection
  - Remediation suggestions
  - Export capabilities

## 🔌 Plugin System

Create custom plugins to extend ViperScan's functionality:

```javascript
// Example plugin
export default {
  name: 'Custom Scanner',
  version: '1.0.0',
  description: 'Custom vulnerability scanner',
  
  async scan(target) {
    // Implementation
  }
};
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

- OWASP Foundation
- Security Tool Maintainers
- Open Source Community

## 🔗 Links

- [Documentation](https://docs.viperscan.io)
- [Bug Tracker](https://github.com/abdullah-x909/viperscan/issues)
- [Feature Requests](https://github.com/abdullah-x909/viperscan/discussions)

## 📊 Project Status

ViperScan is currently in alpha. We're actively developing new features and improving existing ones. Check our [roadmap](ROADMAP.md) for upcoming features.

## ⚠️ Disclaimer

ViperScan is designed for ethical hacking and security testing. Always obtain proper authorization before testing any systems or networks.
