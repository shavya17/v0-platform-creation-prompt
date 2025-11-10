"use client"

import { useState } from "react"
import Dashboard from "@/components/dashboard"
import Quiz from "@/components/quiz"
import type { QuizStage } from "@/lib/types"
import { useProgress } from "@/hooks/use-progress"

export default function Home() {
  const [currentStage, setCurrentStage] = useState<QuizStage | null>(null)

  const { progress, stages, isLoading, updateProgress, addCompletedStage, updateStages, setLastStage } = useProgress(
    createDefaultStages(),
  )

  const handleStartStage = (stage: QuizStage) => {
    setCurrentStage(stage)
    setLastStage(stage.id)
  }

  const handleCompleteStage = (score: number) => {
    if (!currentStage || !progress) return
    addCompletedStage(currentStage.id, score)
    setCurrentStage(null)
  }

  const handleBackToDashboard = () => {
    setCurrentStage(null)
  }

  if (isLoading || !progress || !stages) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl font-bold text-primary mb-4">CyberShield Academy</div>
          <div className="text-muted-foreground">Loading...</div>
        </div>
      </div>
    )
  }

  if (currentStage) {
    return <Quiz stage={currentStage} onComplete={handleCompleteStage} onBack={handleBackToDashboard} />
  }

  return <Dashboard stages={stages} userProgress={progress} onStartStage={handleStartStage} />
}

function createDefaultStages(): QuizStage[] {
  return [
    {
      id: 1,
      title: "Network Fundamentals",
      description: "Master the basics of network security",
      difficulty: "Beginner",
      requiredScore: 70,
      questions: [
        {
          id: 1,
          text: "What does IP stand for?",
          options: ["Internet Protocol", "Internal Process", "Internet Program", "Information Protocol"],
          correctAnswer: 0,
          explanation: "IP (Internet Protocol) is the fundamental protocol for routing data across networks.",
        },
        {
          id: 2,
          text: "Which port is typically used for HTTPS?",
          options: ["80", "443", "8080", "3306"],
          correctAnswer: 1,
          explanation: "Port 443 is the standard port for HTTPS (secure HTTP) communications.",
        },
        {
          id: 3,
          text: "What is a firewall?",
          options: [
            "A physical barrier against heat",
            "A network security system that monitors and controls traffic",
            "A type of malware",
            "A backup system",
          ],
          correctAnswer: 1,
          explanation: "A firewall is a network security device that filters incoming and outgoing traffic.",
        },
        {
          id: 4,
          text: "What does DNS stand for?",
          options: ["Direct Network System", "Domain Name System", "Data Network Server", "Digital Network Security"],
          correctAnswer: 1,
          explanation: "DNS (Domain Name System) translates domain names into IP addresses.",
        },
        {
          id: 5,
          text: "What is a VPN?",
          options: [
            "Virtual Private Network",
            "Very Private Network",
            "Virtual Protocol Network",
            "Verified Private Node",
          ],
          correctAnswer: 0,
          explanation: "A VPN (Virtual Private Network) creates a secure, encrypted connection over public networks.",
        },
      ],
    },
    {
      id: 2,
      title: "Cryptography Basics",
      description: "Learn encryption and cryptographic principles",
      difficulty: "Intermediate",
      requiredScore: 75,
      questions: [
        {
          id: 6,
          text: "What is encryption?",
          options: [
            "Converting data into a format that cannot be read without a key",
            "Deleting sensitive files",
            "Creating backups",
            "Organizing data alphabetically",
          ],
          correctAnswer: 0,
          explanation: "Encryption transforms readable data into ciphertext using cryptographic algorithms.",
        },
        {
          id: 7,
          text: "What is the difference between symmetric and asymmetric encryption?",
          options: [
            "There is no difference",
            "Symmetric uses one key, asymmetric uses two keys",
            "Symmetric is faster than asymmetric",
            "Both use multiple keys",
          ],
          correctAnswer: 1,
          explanation: "Symmetric encryption uses one shared key, while asymmetric uses a public-private key pair.",
        },
        {
          id: 8,
          text: "What does SSL/TLS provide?",
          options: [
            "Only authentication",
            "Secure communication over networks with encryption and authentication",
            "File compression",
            "Speed optimization",
          ],
          correctAnswer: 1,
          explanation: "SSL/TLS provides secure, encrypted communication channels between clients and servers.",
        },
        {
          id: 9,
          text: "What is a hash function?",
          options: [
            "A function that breaks down large files",
            "A function that produces a fixed-size output from any input",
            "A type of encryption algorithm",
            "A backup system",
          ],
          correctAnswer: 1,
          explanation: "Hash functions map input data to a fixed-size output, creating unique digital fingerprints.",
        },
        {
          id: 10,
          text: "What makes a strong password?",
          options: [
            "Long length only",
            "Mix of uppercase, lowercase, numbers, and symbols",
            "Having your birthday in it",
            "Using the same password everywhere",
          ],
          correctAnswer: 1,
          explanation:
            "Strong passwords combine uppercase, lowercase, numbers, and special characters for maximum security.",
        },
      ],
    },
    {
      id: 3,
      title: "Common Attack Vectors",
      description: "Identify and defend against major cyber threats",
      difficulty: "Intermediate",
      requiredScore: 75,
      questions: [
        {
          id: 11,
          text: "What is phishing?",
          options: [
            "Catching fish online",
            "Social engineering attack to trick users into revealing information",
            "A type of firewall",
            "Network monitoring tool",
          ],
          correctAnswer: 1,
          explanation:
            "Phishing is a social engineering attack that uses deceptive emails or websites to steal credentials.",
        },
        {
          id: 12,
          text: "What is malware?",
          options: [
            "Bad data",
            "Malicious software designed to harm systems",
            "A networking protocol",
            "A type of encryption",
          ],
          correctAnswer: 1,
          explanation: "Malware is malicious software including viruses, trojans, and ransomware that damages systems.",
        },
        {
          id: 13,
          text: "What is a man-in-the-middle attack?",
          options: [
            "A physical attack",
            "An attacker intercepts communication between two parties",
            "A type of firewall",
            "A backup strategy",
          ],
          correctAnswer: 1,
          explanation:
            "MITM attacks involve attackers intercepting and potentially altering communications between parties.",
        },
        {
          id: 14,
          text: "What is SQL injection?",
          options: [
            "A type of vaccine",
            "An injection of medical fluid",
            "Inserting malicious SQL code into input fields",
            "A database backup method",
          ],
          correctAnswer: 2,
          explanation: "SQL injection is an attack where malicious SQL code is inserted into user input fields.",
        },
        {
          id: 15,
          text: "What is a DDoS attack?",
          options: [
            "A disease affecting computers",
            "Overwhelming a server with traffic to make it unavailable",
            "A type of encryption",
            "A backup system",
          ],
          correctAnswer: 1,
          explanation: "DDoS (Distributed Denial of Service) attacks flood targets with traffic from multiple sources.",
        },
      ],
    },
    {
      id: 4,
      title: "Access Control & Authentication",
      description: "Master secure authentication methods",
      difficulty: "Advanced",
      requiredScore: 80,
      questions: [
        {
          id: 16,
          text: "What is multi-factor authentication (MFA)?",
          options: [
            "Using multiple passwords",
            "Authentication requiring multiple verification methods",
            "A type of encryption",
            "A firewall setting",
          ],
          correctAnswer: 1,
          explanation: "MFA requires users to provide multiple forms of verification before gaining access.",
        },
        {
          id: 17,
          text: "What is the principle of least privilege?",
          options: [
            "Everyone gets basic access",
            "Giving users only the minimum permissions needed",
            "All users have admin access",
            "Using expensive security tools",
          ],
          correctAnswer: 1,
          explanation: "Least privilege means users get only the permissions necessary for their role.",
        },
        {
          id: 18,
          text: "What is OAuth?",
          options: [
            "A type of malware",
            "An open standard for authorization",
            "A backup protocol",
            "A network monitoring tool",
          ],
          correctAnswer: 1,
          explanation: "OAuth is an open standard for secure delegated access without sharing passwords.",
        },
        {
          id: 19,
          text: "What is biometric authentication?",
          options: [
            "Using birth dates",
            "Using biological characteristics like fingerprints or facial recognition",
            "Using passwords only",
            "Using tokens only",
          ],
          correctAnswer: 1,
          explanation: "Biometric authentication uses unique physical or behavioral characteristics for verification.",
        },
        {
          id: 20,
          text: "What is a security token?",
          options: [
            "A physical device or digital code for authentication",
            "A type of virus",
            "A backup method",
            "A network protocol",
          ],
          correctAnswer: 0,
          explanation: "Security tokens are hardware devices or digital codes that provide authentication factors.",
        },
      ],
    },
    {
      id: 5,
      title: "Incident Response & Monitoring",
      description: "Detect and respond to security incidents",
      difficulty: "Advanced",
      requiredScore: 80,
      questions: [
        {
          id: 21,
          text: "What is an IDS?",
          options: [
            "Identity Document System",
            "Intrusion Detection System",
            "Internet Data Server",
            "Internal Device Security",
          ],
          correctAnswer: 1,
          explanation: "IDS (Intrusion Detection System) monitors networks for suspicious activity and attacks.",
        },
        {
          id: 22,
          text: "What is a security event?",
          options: [
            "A conference about security",
            "Any detectable occurrence in a system or network",
            "A type of malware",
            "A backup procedure",
          ],
          correctAnswer: 1,
          explanation: "A security event is any observable action or occurrence in a system or network.",
        },
        {
          id: 23,
          text: "What is SIEM?",
          options: [
            "Security Information and Event Management",
            "System Improvement and Error Monitoring",
            "Secure Internet Email Management",
            "Server Information Exchange Module",
          ],
          correctAnswer: 0,
          explanation: "SIEM collects, analyzes, and manages security information and event data.",
        },
        {
          id: 24,
          text: "What should be the first step in incident response?",
          options: [
            "Immediately disconnect all systems",
            "Detect and identify the incident",
            "Blame a person",
            "Ignore it",
          ],
          correctAnswer: 1,
          explanation: "Detection and identification is the first critical step in effective incident response.",
        },
        {
          id: 25,
          text: "What is a forensic investigation?",
          options: [
            "A legal trial",
            "Analyzing evidence of a security incident",
            "A type of firewall",
            "A backup strategy",
          ],
          correctAnswer: 1,
          explanation: "Forensic investigation analyzes evidence to understand how a security incident occurred.",
        },
      ],
    },
    {
      id: 6,
      title: "Secure Development",
      description: "Build security into applications",
      difficulty: "Expert",
      requiredScore: 85,
      questions: [
        {
          id: 26,
          text: "What is secure coding?",
          options: [
            "Using secret variable names",
            "Writing code with security vulnerabilities in mind",
            "Using encryption only",
            "Writing code quickly",
          ],
          correctAnswer: 1,
          explanation:
            "Secure coding involves writing software while addressing and preventing security vulnerabilities.",
        },
        {
          id: 27,
          text: "What is input validation?",
          options: [
            "Checking user input for correct format and content",
            "Accepting all user input",
            "Using passwords for validation",
            "Disabling user input",
          ],
          correctAnswer: 0,
          explanation: "Input validation checks and filters user-supplied data to prevent attacks.",
        },
        {
          id: 28,
          text: "What is OWASP?",
          options: [
            "A type of malware",
            "Open Web Application Security Project",
            "Old Web Application Standards Page",
            "Operating Web Application Security Protocol",
          ],
          correctAnswer: 1,
          explanation: "OWASP is an organization focused on web application security best practices.",
        },
        {
          id: 29,
          text: "What is a vulnerability assessment?",
          options: [
            "Counting security vulnerabilities on a whiteboard",
            "Systematic analysis to identify security weaknesses",
            "A type of malware",
            "A firewall rule",
          ],
          correctAnswer: 1,
          explanation: "Vulnerability assessment systematically identifies security weaknesses in systems.",
        },
        {
          id: 30,
          text: "What is penetration testing?",
          options: [
            "Hitting walls with a tool",
            "Authorized testing to find and exploit vulnerabilities",
            "A type of malware",
            "A backup procedure",
          ],
          correctAnswer: 1,
          explanation: "Penetration testing is authorized security testing to identify exploitable vulnerabilities.",
        },
      ],
    },
    {
      id: 7,
      title: "Cloud Security",
      description: "Secure cloud infrastructure and services",
      difficulty: "Expert",
      requiredScore: 85,
      questions: [
        {
          id: 31,
          text: "What is IaaS?",
          options: [
            "Infrastructure as a Service",
            "Internet as a Server",
            "Internal Application Suite",
            "Information Architecture Standard",
          ],
          correctAnswer: 0,
          explanation: "IaaS (Infrastructure as a Service) provides virtualized computing resources over the internet.",
        },
        {
          id: 32,
          text: "What is PaaS?",
          options: [
            "Platform as a Service",
            "Personal Application Server",
            "Public Access System",
            "Protocol Application Suite",
          ],
          correctAnswer: 0,
          explanation: "PaaS (Platform as a Service) provides a development environment for building applications.",
        },
        {
          id: 33,
          text: "What is SaaS?",
          options: [
            "Software as a Service",
            "Secure Application Suite",
            "System Administration Support",
            "Scalable Application Server",
          ],
          correctAnswer: 0,
          explanation: "SaaS (Software as a Service) delivers applications over the internet on a subscription basis.",
        },
        {
          id: 34,
          text: "What is cloud encryption?",
          options: [
            "Encrypting only passwords",
            "Encrypting data before and during cloud storage/transmission",
            "A type of backup",
            "A firewall rule",
          ],
          correctAnswer: 1,
          explanation: "Cloud encryption protects data by encrypting it before upload and during storage.",
        },
        {
          id: 35,
          text: "What is a cloud security posture?",
          options: [
            "How a company stands in the cloud",
            "Overall security status and configuration of cloud resources",
            "A type of malware",
            "A backup strategy",
          ],
          correctAnswer: 1,
          explanation:
            "Cloud security posture is the overall security configuration and status of cloud infrastructure.",
        },
      ],
    },
    {
      id: 8,
      title: "Compliance & Risk Management",
      description: "Navigate regulatory requirements and risk",
      difficulty: "Expert",
      requiredScore: 85,
      questions: [
        {
          id: 36,
          text: "What is GDPR?",
          options: [
            "General Database Protection Regulation",
            "General Data Protection Regulation",
            "Global Digital Privacy Rule",
            "Government Data Protection Rule",
          ],
          correctAnswer: 1,
          explanation: "GDPR (General Data Protection Regulation) is EU regulation for data privacy and protection.",
        },
        {
          id: 37,
          text: "What is risk assessment?",
          options: [
            "Evaluating potential risks and their impact",
            "Ignoring security problems",
            "Using expensive tools only",
            "Asking random people",
          ],
          correctAnswer: 0,
          explanation: "Risk assessment identifies and evaluates potential security threats and their impact.",
        },
        {
          id: 38,
          text: "What is a security policy?",
          options: [
            "A document stating security rules and procedures",
            "An insurance policy",
            "A type of malware",
            "A backup method",
          ],
          correctAnswer: 0,
          explanation: "Security policies document organizational security rules, procedures, and requirements.",
        },
        {
          id: 39,
          text: "What is compliance?",
          options: [
            "Following all rules strictly",
            "Adhering to regulations, standards, and organizational policies",
            "Using the most expensive tools",
            "Ignoring standards",
          ],
          correctAnswer: 1,
          explanation: "Compliance means meeting regulatory requirements, standards, and organizational policies.",
        },
        {
          id: 40,
          text: "What is business continuity planning?",
          options: [
            "Continuing business operations during disruptions",
            "Only using expensive backups",
            "Ignoring disasters",
            "Following social media trends",
          ],
          correctAnswer: 0,
          explanation:
            "Business continuity planning ensures operations continue during security incidents or disasters.",
        },
      ],
    },
  ]
}
