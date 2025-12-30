import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Info, TrendingUp, Shield, DollarSign, Clock, AlertTriangle, 
  Users, Laptop, FileText, ChevronRight, Copy, Check, 
  Moon, Sun, Building, Briefcase, Calculator,
  Share2, RotateCcw, Download, ExternalLink, ChevronDown
} from 'lucide-react'
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip 
} from 'recharts'
import { Toaster, toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { 
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger 
} from '@/components/ui/tooltip'
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

import { cn, formatCurrency, formatNumber } from '@/lib/utils'
import { AnimatedCounter } from '@/components/ui/animated-counter'
import { GlassCard, GlassCardContent, GlassCardDescription, GlassCardHeader, GlassCardTitle } from '@/components/ui/glass-card'

// Brand Colors - Enterprise Palette
const COLORS = {
  teal: '#16A085',
  brightGreen: '#7FFF00',
  coral: '#FF6B6B',
  lightTeal: '#48C9B0',
  mediumTeal: '#1ABC9C',
  slate: '#1F2937'
}

// Citations Data
const citations = {
  passwordReset: {
    title: "Forrester Research",
    source: "Forrester Total Economic Impact Study",
    text: "Forrester estimates a single password reset costs an organization $70 on average, factoring in help desk time and lost employee productivity.",
    link: "https://www.forrester.com/report/The-Total-Economic-Impact-Of-Passwordless-Authentication/RES176865"
  },
  productivity: {
    title: "Beyond Identity Case Study: Taulia",
    source: "Taulia Customer Story",
    text: "Taulia reported saving each employee ~10 minutes per day by eliminating password friction and authentication delays.",
    link: "https://www.beyondidentity.com/customer-stories/taulia-case-study"
  },
  breachCost: {
    title: "IBM Cost of a Data Breach 2024",
    source: "IBM Security Report",
    text: "The average cost of a data breach reached $4.88 million in 2024. Organizations with extensive security AI and automation saved $2.22 million compared to those without.",
    link: "https://www.ibm.com/reports/data-breach"
  },
  insurance: {
    title: "Cyber Insurance Trends",
    source: "CyberMaxx & Push Security",
    text: "Insurers are increasing premiums by 20-50% for organizations without strong MFA. Implementing phishing-resistant MFA can reduce premiums by up to 25%.",
    link: "https://www.cybermaxx.com/resources/cyber-insurance-challenges-why-premiums-are-rising-and-coverage-is-harder-to-obtain/"
  },
  helpDesk: {
    title: "HDI Support Center Report",
    source: "HDI Research",
    text: "Password-related tickets account for 30-50% of all IT help desk volume. Eliminating these tickets frees up significant IT resources.",
    link: "https://www.thinkhdi.com/"
  },
  phishing: {
    title: "Dashlane Phishing Report",
    source: "Dashlane Phishing 2.0",
    text: "AI-powered phishing attacks have surged by 4,151%, with a 54% success rate against traditional MFA.",
    link: "https://www.dashlane.com/blog/security-leaders-ai-phishing"
  }
}

function App() {
  // --- State ---
  const [mounted, setMounted] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [prospectName, setProspectName] = useState('')
  
  // Inputs
  const [numEmployees, setNumEmployees] = useState(500)
  const [numDevices, setNumDevices] = useState(500)
  const [cyberInsurancePremium, setCyberInsurancePremium] = useState(100000)
  
  // Assumptions
  const [costPerReset, setCostPerReset] = useState(70)
  const [resetsPerYear, setResetsPerYear] = useState(3)
  const [avgEmployeeWage, setAvgEmployeeWage] = useState(50)
  const [itStaffRate, setItStaffRate] = useState(60)
  const [breachCost, setBreachCost] = useState(4810000)
  const [breachReduction, setBreachReduction] = useState(80)
  
  // UI State
  const [activeTab, setActiveTab] = useState('inputs')
  const [showCitation, setShowCitation] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [expandedRow, setExpandedRow] = useState<string | null>(null)

  // --- Effects ---
  useEffect(() => {
    setMounted(true)
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true)
    }
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  // --- Calculations ---
  const passwordResetSavings = numEmployees * resetsPerYear * costPerReset
  const productivitySavings = numEmployees * (10 / 60) * 250 * avgEmployeeWage
  const breachRiskReduction = (breachReduction / 100) * 0.10 * breachCost
  const insuranceSavings = cyberInsurancePremium * 0.25
  const estimatedTickets = Math.max(2000, numEmployees * 10)
  const itHelpDeskSavings = (estimatedTickets * 0.30 * (10 / 60) * itStaffRate)
  
  const totalROI = passwordResetSavings + productivitySavings + breachRiskReduction + insuranceSavings + itHelpDeskSavings
  
  const roiBreakdown = [
    { 
      id: 'productivity',
      name: 'Productivity Gains', 
      value: productivitySavings, 
      color: COLORS.brightGreen,
      formula: 'Employees × (10 mins/day) × 250 days × Avg Wage',
      calculation: `${formatNumber(numEmployees)} × 0.167 hrs × 250 × ${formatCurrency(avgEmployeeWage)}`,
      citationKey: 'productivity'
    },
    { 
      id: 'breach',
      name: 'Breach Risk Reduction', 
      value: breachRiskReduction, 
      color: COLORS.coral,
      formula: 'Breach Cost × 10% Probability × Risk Reduction %',
      calculation: `${formatCurrency(breachCost)} × 0.10 × ${breachReduction}%`,
      citationKey: 'breachCost'
    },
    { 
      id: 'reset',
      name: 'Password Resets', 
      value: passwordResetSavings, 
      color: COLORS.teal,
      formula: 'Employees × Resets/Year × Cost/Reset',
      calculation: `${formatNumber(numEmployees)} × ${resetsPerYear} × ${formatCurrency(costPerReset)}`,
      citationKey: 'passwordReset'
    },
    { 
      id: 'insurance',
      name: 'Insurance Savings', 
      value: insuranceSavings, 
      color: COLORS.lightTeal,
      formula: 'Annual Premium × 25% Discount',
      calculation: `${formatCurrency(cyberInsurancePremium)} × 0.25`,
      citationKey: 'insurance'
    },
    { 
      id: 'helpdesk',
      name: 'IT Help Desk', 
      value: itHelpDeskSavings, 
      color: COLORS.mediumTeal,
      formula: 'Tickets × 30% Pwd Related × 10 mins × IT Rate',
      calculation: `${formatNumber(estimatedTickets)} × 0.30 × 0.167 × ${formatCurrency(itStaffRate)}`,
      citationKey: 'helpDesk'
    },
  ]

  // --- Handlers ---
  const handleCopySummary = () => {
    const summary = `
ROI Analysis for ${prospectName || 'Your Organization'}
------------------------------------------------
Total Annual ROI: ${formatCurrency(totalROI)}

Breakdown:
- Productivity Gains: ${formatCurrency(productivitySavings)}
- Breach Risk Reduction: ${formatCurrency(breachRiskReduction)}
- Password Reset Savings: ${formatCurrency(passwordResetSavings)}
- Insurance Savings: ${formatCurrency(insuranceSavings)}
- IT Help Desk Savings: ${formatCurrency(itHelpDeskSavings)}

Assumptions:
- Employees: ${formatNumber(numEmployees)}
- Devices: ${formatNumber(numDevices)}
- Insurance Premium: ${formatCurrency(cyberInsurancePremium)}
    `.trim()
    
    navigator.clipboard.writeText(summary)
    setCopied(true)
    toast.success("ROI Summary copied to clipboard!")
    setTimeout(() => setCopied(false), 2000)
  }

  const applyPreset = (size: 'smb' | 'mid' | 'ent') => {
    if (size === 'smb') {
      setNumEmployees(100)
      setNumDevices(120)
      setCyberInsurancePremium(25000)
    } else if (size === 'mid') {
      setNumEmployees(500)
      setNumDevices(600)
      setCyberInsurancePremium(100000)
    } else {
      setNumEmployees(5000)
      setNumDevices(6000)
      setCyberInsurancePremium(500000)
    }
    toast.info(`Applied ${size.toUpperCase()} preset`)
  }

  // --- Render Helpers ---
  const CitationModal = () => {
    if (!showCitation) return null
    
    const citationData = citations[showCitation as keyof typeof citations]
    if (!citationData) return null

    return (
      <Dialog open={!!showCitation} onOpenChange={() => setShowCitation(null)}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
              <FileText className="h-5 w-5 text-teal-600" />
              {citationData.title}
            </DialogTitle>
            <DialogDescription>
              <Badge variant="secondary" className="mt-2 bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                {citationData.source}
              </Badge>
            </DialogDescription>
          </DialogHeader>
          <div className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 mt-2">
            {citationData.text}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <a 
              href={citationData.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-xs font-medium text-teal-600 hover:text-teal-700 hover:underline"
            >
              View Original Report <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  if (!mounted) return null

  return (
    <TooltipProvider>
      <div className={cn(
        "min-h-screen transition-colors duration-500 font-sans",
        darkMode ? "bg-slate-950 text-slate-50" : "bg-slate-50 text-slate-900"
      )}>
        {/* Enterprise Header - Clean & High Contrast */}
        <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-teal-600 p-1.5 rounded-lg">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900 dark:text-white leading-none">
                  Beyond Identity
                </h1>
                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
                  ROI Calculator
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative group hidden sm:block">
                <Input 
                  value={prospectName}
                  onChange={(e) => setProspectName(e.target.value)}
                  placeholder="Enter Prospect Name..."
                  className="h-9 w-64 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:ring-teal-500 focus:border-teal-500 text-sm"
                />
              </div>
              
              <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block" />
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-9 w-9 text-slate-500 hover:text-teal-600"
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">
          
          {/* Top Stats Row - High Visibility */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main ROI Card */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2 text-slate-600 hover:text-teal-600 hover:border-teal-200"
                  onClick={handleCopySummary}
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied" : "Copy Summary"}
                </Button>
              </div>

              <div className="flex flex-col justify-center h-full space-y-2">
                <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Total Annual ROI</h2>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white tracking-tight">
                    <AnimatedCounter value={totalROI} />
                  </span>
                </div>
                <p className="text-slate-500 max-w-lg">
                  Estimated first-year savings based on productivity gains, risk reduction, and operational efficiency.
                </p>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Productivity</p>
                    <p className="text-lg font-bold text-teal-600">
                      {formatCurrency(productivitySavings)}
                    </p>
                    <button onClick={() => setShowCitation('productivity')} className="text-[10px] text-slate-400 hover:text-teal-600 underline decoration-dotted mt-1">
                      Source: Taulia
                    </button>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Risk Reduced</p>
                    <p className="text-lg font-bold text-coral-500" style={{ color: COLORS.coral }}>
                      {formatCurrency(breachRiskReduction)}
                    </p>
                    <button onClick={() => setShowCitation('breachCost')} className="text-[10px] text-slate-400 hover:text-teal-600 underline decoration-dotted mt-1">
                      Source: IBM
                    </button>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">IT Savings</p>
                    <p className="text-lg font-bold text-teal-600">
                      {formatCurrency(itHelpDeskSavings)}
                    </p>
                    <button onClick={() => setShowCitation('helpDesk')} className="text-[10px] text-slate-400 hover:text-teal-600 underline decoration-dotted mt-1">
                      Source: HDI
                    </button>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Insurance</p>
                    <p className="text-lg font-bold text-teal-600">
                      {formatCurrency(insuranceSavings)}
                    </p>
                    <button onClick={() => setShowCitation('insurance')} className="text-[10px] text-slate-400 hover:text-teal-600 underline decoration-dotted mt-1">
                      Source: CyberMaxx
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Configuration Panel */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 flex flex-col h-full">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex-1 flex flex-col">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="inputs">Configuration</TabsTrigger>
                  <TabsTrigger value="assumptions">Assumptions</TabsTrigger>
                </TabsList>

                <TabsContent value="inputs" className="space-y-6 flex-1">
                  <div className="space-y-4">
                    <Label className="text-xs font-semibold text-slate-500 uppercase">Quick Presets</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <Button variant="outline" size="sm" onClick={() => applyPreset('smb')} className="hover:border-teal-500 hover:text-teal-600">
                        <Building className="mr-2 h-3 w-3" /> SMB
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => applyPreset('mid')} className="hover:border-teal-500 hover:text-teal-600">
                        <Briefcase className="mr-2 h-3 w-3" /> Mid
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => applyPreset('ent')} className="hover:border-teal-500 hover:text-teal-600">
                        <Building className="mr-2 h-3 w-3" /> Ent
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Employees</Label>
                        <span className="text-sm font-medium text-teal-600">{formatNumber(numEmployees)}</span>
                      </div>
                      <Input 
                        type="number" 
                        value={numEmployees} 
                        onChange={(e) => setNumEmployees(Number(e.target.value))}
                        className="focus-visible:ring-teal-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Devices</Label>
                        <span className="text-sm font-medium text-teal-600">{formatNumber(numDevices)}</span>
                      </div>
                      <Input 
                        type="number" 
                        value={numDevices} 
                        onChange={(e) => setNumDevices(Number(e.target.value))}
                        className="focus-visible:ring-teal-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Insurance Premium</Label>
                        <span className="text-sm font-medium text-teal-600">{formatCurrency(cyberInsurancePremium)}</span>
                      </div>
                      <Input 
                        type="number" 
                        value={cyberInsurancePremium} 
                        onChange={(e) => setCyberInsurancePremium(Number(e.target.value))}
                        className="focus-visible:ring-teal-500"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="assumptions" className="space-y-4 flex-1 overflow-y-auto pr-2 max-h-[400px]">
                  <AssumptionSlider 
                    label="Cost Per Reset" 
                    value={costPerReset} 
                    setValue={setCostPerReset} 
                    min={20} max={150} step={5} 
                    format={(v: number) => `$${v}`}
                    citation="passwordReset"
                    onInfoClick={setShowCitation}
                  />
                  <AssumptionSlider 
                    label="Resets Per Year" 
                    value={resetsPerYear} 
                    setValue={setResetsPerYear} 
                    min={1} max={12} step={1} 
                    format={(v: number) => `${v}`}
                    citation="passwordReset"
                    onInfoClick={setShowCitation}
                  />
                  <AssumptionSlider 
                    label="Avg Hourly Wage" 
                    value={avgEmployeeWage} 
                    setValue={setAvgEmployeeWage} 
                    min={20} max={200} step={5} 
                    format={(v: number) => `$${v}`}
                    citation="productivity"
                    onInfoClick={setShowCitation}
                  />
                  <AssumptionSlider 
                    label="Breach Risk Reduction" 
                    value={breachReduction} 
                    setValue={setBreachReduction} 
                    min={10} max={95} step={5} 
                    format={(v: number) => `${v}%`}
                    citation="breachCost"
                    onInfoClick={setShowCitation}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Data Sources & Threat Landscape - Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Threat Landscape Alert */}
            <div className="bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-500" />
                <h3 className="font-semibold text-orange-900 dark:text-orange-100">Current Threat Landscape</h3>
              </div>
              <div className="space-y-3">
                <div className="flex gap-3 items-start bg-white dark:bg-slate-900 p-3 rounded-lg border border-orange-100 dark:border-orange-900/50">
                  <div className="bg-orange-100 dark:bg-orange-900 p-1.5 rounded">
                    <Shield className="h-4 w-4 text-orange-700 dark:text-orange-300" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">AI Phishing Surge</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      Phishing volume up <strong>4,151%</strong> with 54% success rate.
                    </p>
                    <button onClick={() => setShowCitation('phishing')} className="text-[10px] text-teal-600 hover:underline mt-1">
                      Source: Dashlane Phishing 2.0
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Dedicated Data Sources Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="h-5 w-5 text-teal-600" />
                <h3 className="font-semibold text-slate-900 dark:text-white">Verified Data Sources</h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(citations).map(([key, data]) => (
                  <button 
                    key={key}
                    onClick={() => setShowCitation(key)}
                    className="text-left text-xs p-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-colors group"
                  >
                    <p className="font-medium text-slate-700 dark:text-slate-300 group-hover:text-teal-700 dark:group-hover:text-teal-400">
                      {data.title}
                    </p>
                    <p className="text-[10px] text-slate-500 truncate">
                      {data.source}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Detailed Breakdown with Explain the Math */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Detailed Savings Breakdown</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="h-[300px] w-full sticky top-24">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={roiBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={110}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {roiBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      formatter={(value: number) => formatCurrency(value)}
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                        borderRadius: '8px', 
                        border: '1px solid #e2e8f0',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-3">
                {roiBreakdown.map((item, index) => (
                  <Collapsible
                    key={index}
                    open={expandedRow === item.id}
                    onOpenChange={() => setExpandedRow(expandedRow === item.id ? null : item.id)}
                    className="border border-transparent hover:border-slate-100 dark:hover:border-slate-700 rounded-lg transition-all"
                  >
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-base font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                          {item.name}
                        </span>
                        <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform duration-200", expandedRow === item.id && "rotate-180")} />
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-slate-900 dark:text-white">
                          {formatCurrency(item.value)}
                        </p>
                        <p className="text-sm text-slate-500">
                          {((item.value / totalROI) * 100).toFixed(1)}%
                        </p>
                      </div>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent>
                      <div className="px-4 pb-4 pt-0 space-y-3">
                        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-md p-3 text-sm space-y-2 border border-slate-100 dark:border-slate-800">
                          <div className="flex justify-between items-center text-xs text-slate-500 uppercase tracking-wider font-semibold">
                            <span>Formula</span>
                            <Calculator className="h-3 w-3" />
                          </div>
                          <div className="font-mono text-xs text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-700">
                            {item.formula}
                          </div>
                          
                          <div className="flex justify-between items-center text-xs text-slate-500 uppercase tracking-wider font-semibold mt-2">
                            <span>Calculation</span>
                          </div>
                          <div className="font-mono text-xs text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20 p-2 rounded border border-teal-100 dark:border-teal-900/30">
                            {item.calculation} = <strong>{formatCurrency(item.value)}</strong>
                          </div>

                          <div className="pt-2 mt-2 border-t border-slate-200 dark:border-slate-700 flex justify-end">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation()
                                setShowCitation(item.citationKey)
                              }}
                              className="text-xs flex items-center gap-1 text-teal-600 hover:text-teal-700 hover:underline font-medium"
                            >
                              <Info className="h-3 w-3" />
                              View Source Data
                            </button>
                          </div>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            </div>
          </div>

        </main>

        <CitationModal />
        <Toaster position="top-center" />
      </div>
    </TooltipProvider>
  )
}

// Helper Component for Sliders
function AssumptionSlider({ label, value, setValue, min, max, step, format, citation, onInfoClick }: any) {
  return (
    <div className="space-y-3 p-3 rounded-lg border border-slate-100 dark:border-slate-800 hover:border-teal-100 dark:hover:border-teal-900/30 transition-colors">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</Label>
          <button 
            onClick={() => onInfoClick(citation)}
            className="text-slate-400 hover:text-teal-600 transition-colors"
          >
            <Info className="h-3.5 w-3.5" />
          </button>
        </div>
        <span className="text-sm font-bold text-teal-600 bg-teal-50 dark:bg-teal-900/20 px-2 py-0.5 rounded">
          {format(value)}
        </span>
      </div>
      <Slider
        value={[value]}
        onValueChange={(vals) => setValue(vals[0])}
        min={min}
        max={max}
        step={step}
        className="py-2"
      />
    </div>
  )
}

export default App
