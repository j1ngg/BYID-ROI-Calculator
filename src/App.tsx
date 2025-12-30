import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Info, TrendingUp, Shield, DollarSign, Clock, AlertTriangle, 
  Users, Laptop, FileText, ChevronRight, Copy, Check, 
  Monitor, Moon, Sun, Building, Briefcase, Calculator,
  Share2, RotateCcw, Download
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

import { cn, formatCurrency, formatNumber } from '@/lib/utils'
import { AnimatedCounter } from '@/components/ui/animated-counter'
import { GlassCard, GlassCardContent, GlassCardDescription, GlassCardHeader, GlassCardTitle } from '@/components/ui/glass-card'

// Brand Colors
const COLORS = {
  teal: '#16A085',
  brightGreen: '#7FFF00',
  coral: '#FF6B6B',
  lightTeal: '#48C9B0',
  mediumTeal: '#1ABC9C',
  slate: '#1F2937'
}

function App() {
  // --- State ---
  const [mounted, setMounted] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [presentMode, setPresentMode] = useState(false)
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
    { name: 'Password Resets', value: passwordResetSavings, color: COLORS.teal },
    { name: 'Productivity Gains', value: productivitySavings, color: COLORS.brightGreen },
    { name: 'Breach Risk Reduction', value: breachRiskReduction, color: COLORS.coral },
    { name: 'Insurance Savings', value: insuranceSavings, color: COLORS.lightTeal },
    { name: 'IT Help Desk', value: itHelpDeskSavings, color: COLORS.mediumTeal },
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
        <DialogContent className="sm:max-w-md backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 border-teal-100 dark:border-teal-900">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-teal-700 dark:text-teal-300">
              <FileText className="h-5 w-5" />
              {citationData.title}
            </DialogTitle>
            <DialogDescription>
              <Badge variant="secondary" className="mt-2 bg-teal-50 text-teal-700 border-teal-200">
                {citationData.source}
              </Badge>
            </DialogDescription>
          </DialogHeader>
          <div className="text-sm leading-relaxed text-muted-foreground mt-2">
            {citationData.text}
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  if (!mounted) return null

  return (
    <TooltipProvider>
      <div className={cn(
        "min-h-screen transition-colors duration-500 font-sans selection:bg-teal-100 selection:text-teal-900",
        darkMode ? "bg-slate-950 text-slate-50" : "bg-slate-50 text-slate-900"
      )}>
        {/* Background Gradients */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-teal-400/10 blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-cyan-400/10 blur-[100px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }} />
          <div className="absolute -bottom-[10%] left-[20%] w-[30%] h-[30%] rounded-full bg-green-400/10 blur-[80px] animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto p-4 md:p-6 lg:p-8 space-y-8">
          
          {/* Header & Controls */}
          <header className="flex flex-col md:flex-row justify-between items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl shadow-lg shadow-teal-500/20">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400">
                  Beyond Identity
                </h1>
                <p className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
                  ROI Calculator
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md p-1.5 rounded-full border border-white/20 shadow-sm">
              <div className="relative group">
                <Input 
                  value={prospectName}
                  onChange={(e) => setProspectName(e.target.value)}
                  placeholder="Enter Prospect Name..."
                  className="h-9 w-48 border-none bg-transparent focus-visible:ring-0 text-sm"
                />
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-teal-500 scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300" />
              </div>
              
              <div className="h-4 w-px bg-slate-200 dark:bg-slate-700" />
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 rounded-full hover:bg-teal-50 dark:hover:bg-teal-900/30 text-muted-foreground hover:text-teal-600"
                    onClick={() => setPresentMode(!presentMode)}
                  >
                    <Monitor className={cn("h-4 w-4", presentMode && "text-teal-600 fill-teal-600/20")} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Present Mode</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 rounded-full hover:bg-teal-50 dark:hover:bg-teal-900/30 text-muted-foreground hover:text-teal-600"
                    onClick={() => setDarkMode(!darkMode)}
                  >
                    {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Toggle Theme</TooltipContent>
              </Tooltip>
            </div>
          </header>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-12 gap-8">
            
            {/* Left Column: Inputs (Hidden in Present Mode if desired, but keeping visible for interactivity) */}
            <motion.div 
              className={cn("lg:col-span-4 space-y-6", presentMode && "hidden lg:block")}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <GlassCard className="overflow-hidden">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <div className="px-6 pt-6 pb-2">
                    <TabsList className="w-full grid grid-cols-2 bg-slate-100/50 dark:bg-slate-800/50 p-1">
                      <TabsTrigger value="inputs" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-teal-700 dark:data-[state=active]:text-teal-300 data-[state=active]:shadow-sm">Configuration</TabsTrigger>
                      <TabsTrigger value="assumptions" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-teal-700 dark:data-[state=active]:text-teal-300 data-[state=active]:shadow-sm">Assumptions</TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="inputs" className="p-6 space-y-6 mt-0">
                    {/* Quick Presets */}
                    <div className="space-y-3">
                      <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Quick Presets</Label>
                      <div className="grid grid-cols-3 gap-2">
                        <Button variant="outline" size="sm" onClick={() => applyPreset('smb')} className="hover:border-teal-500 hover:text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/20">
                          <Building className="h-3 w-3 mr-2" /> SMB
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => applyPreset('mid')} className="hover:border-teal-500 hover:text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/20">
                          <Briefcase className="h-3 w-3 mr-2" /> Mid
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => applyPreset('ent')} className="hover:border-teal-500 hover:text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/20">
                          <Building className="h-3 w-3 mr-2" /> Ent
                        </Button>
                      </div>
                    </div>

                    <Separator className="bg-slate-200/60 dark:bg-slate-700/60" />

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="employees">Employees</Label>
                          <span className="text-sm font-mono text-teal-600 dark:text-teal-400 font-medium">{formatNumber(numEmployees)}</span>
                        </div>
                        <Input 
                          id="employees" 
                          type="number" 
                          value={numEmployees} 
                          onChange={(e) => setNumEmployees(Number(e.target.value))}
                          className="bg-white/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 focus-visible:ring-teal-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="devices">Devices</Label>
                          <span className="text-sm font-mono text-teal-600 dark:text-teal-400 font-medium">{formatNumber(numDevices)}</span>
                        </div>
                        <Input 
                          id="devices" 
                          type="number" 
                          value={numDevices} 
                          onChange={(e) => setNumDevices(Number(e.target.value))}
                          className="bg-white/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 focus-visible:ring-teal-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="insurance">Insurance Premium</Label>
                          <span className="text-sm font-mono text-teal-600 dark:text-teal-400 font-medium">{formatCurrency(cyberInsurancePremium)}</span>
                        </div>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                          <Input 
                            id="insurance" 
                            type="number" 
                            value={cyberInsurancePremium} 
                            onChange={(e) => setCyberInsurancePremium(Number(e.target.value))}
                            className="pl-7 bg-white/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 focus-visible:ring-teal-500"
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="assumptions" className="p-6 space-y-6 mt-0 max-h-[500px] overflow-y-auto custom-scrollbar">
                    <AssumptionSlider 
                      label="Cost Per Reset" 
                      value={costPerReset} 
                      setValue={setCostPerReset} 
                      min={20} max={150} step={5} 
                      format={(v) => `$${v}`}
                      citation="passwordReset"
                      onInfoClick={setShowCitation}
                    />
                    <AssumptionSlider 
                      label="Resets / Year" 
                      value={resetsPerYear} 
                      setValue={setResetsPerYear} 
                      min={1} max={10} step={1} 
                      citation="passwordReset"
                      onInfoClick={setShowCitation}
                    />
                    <AssumptionSlider 
                      label="Avg Hourly Wage" 
                      value={avgEmployeeWage} 
                      setValue={setAvgEmployeeWage} 
                      min={20} max={200} step={5} 
                      format={(v) => `$${v}`}
                      citation="productivity"
                      onInfoClick={setShowCitation}
                    />
                    <AssumptionSlider 
                      label="Breach Risk Reduction" 
                      value={breachReduction} 
                      setValue={setBreachReduction} 
                      min={10} max={95} step={5} 
                      format={(v) => `${v}%`}
                      citation="breachCost"
                      onInfoClick={setShowCitation}
                    />
                  </TabsContent>
                </Tabs>
              </GlassCard>

              {/* Threat Landscape Card */}
              <GlassCard className="bg-gradient-to-br from-orange-50/80 to-red-50/80 dark:from-orange-950/30 dark:to-red-950/30 border-orange-200/50 dark:border-orange-900/50">
                <GlassCardHeader className="pb-2">
                  <GlassCardTitle className="text-base flex items-center gap-2 text-orange-800 dark:text-orange-200">
                    <AlertTriangle className="h-4 w-4" />
                    Threat Landscape
                  </GlassCardTitle>
                </GlassCardHeader>
                <GlassCardContent className="space-y-3 text-sm">
                  <div className="flex items-start gap-3 p-3 bg-white/40 dark:bg-black/20 rounded-lg">
                    <div className="bg-orange-100 dark:bg-orange-900/50 p-1.5 rounded-md">
                      <Shield className="h-3.5 w-3.5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <p className="font-medium text-orange-900 dark:text-orange-100">AI Phishing Surge</p>
                      <p className="text-orange-800/80 dark:text-orange-200/80 text-xs mt-0.5">
                        Phishing volume up <span className="font-bold">4,151%</span> with 54% success rate.
                      </p>
                    </div>
                  </div>
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="h-auto p-0 text-orange-600 dark:text-orange-400 text-xs"
                    onClick={() => setShowCitation('aiPhishing')}
                  >
                    View Source Data
                  </Button>
                </GlassCardContent>
              </GlassCard>
            </motion.div>

            {/* Right Column: Results */}
            <motion.div 
              className={cn("lg:col-span-8 space-y-6", presentMode && "lg:col-span-12")}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Hero ROI Card */}
              <GlassCard gradient className="relative overflow-hidden border-teal-200/50 dark:border-teal-800/50">
                <div className="absolute top-0 right-0 p-4 flex gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={handleCopySummary} className="hover:bg-teal-100 dark:hover:bg-teal-900/50 text-teal-700 dark:text-teal-300">
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Copy Summary</TooltipContent>
                  </Tooltip>
                </div>

                <GlassCardContent className="p-8 md:p-10 text-center space-y-6">
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-lg font-medium text-muted-foreground mb-2">Total Annual ROI</h2>
                    <div className="flex items-center justify-center gap-1 text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-cyan-500 to-teal-600 dark:from-teal-400 dark:via-cyan-300 dark:to-teal-400 drop-shadow-sm">
                      <span className="text-teal-600 dark:text-teal-400">$</span>
                      <AnimatedCounter value={totalROI} />
                    </div>
                    <p className="text-sm text-muted-foreground mt-4 max-w-md mx-auto">
                      Estimated first-year savings based on productivity gains, risk reduction, and operational efficiency.
                    </p>
                  </motion.div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
                    <MiniStat label="Productivity" value={productivitySavings} color="text-lime-600 dark:text-lime-400" />
                    <MiniStat label="Risk Reduced" value={breachRiskReduction} color="text-rose-500 dark:text-rose-400" />
                    <MiniStat label="IT Savings" value={passwordResetSavings + itHelpDeskSavings} color="text-teal-600 dark:text-teal-400" />
                    <MiniStat label="Insurance" value={insuranceSavings} color="text-cyan-600 dark:text-cyan-400" />
                  </div>
                </GlassCardContent>
              </GlassCard>

              {/* Charts & Breakdown */}
              <div className="grid md:grid-cols-2 gap-6">
                <GlassCard className="min-h-[300px] flex flex-col">
                  <GlassCardHeader>
                    <GlassCardTitle className="text-lg">Savings Distribution</GlassCardTitle>
                  </GlassCardHeader>
                  <GlassCardContent className="flex-1 min-h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={roiBreakdown}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {roiBreakdown.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                          ))}
                        </Pie>
                        <RechartsTooltip 
                          formatter={(value: number) => formatCurrency(value)}
                          contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                            backdropFilter: 'blur(8px)',
                            borderRadius: '12px',
                            border: 'none',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </GlassCardContent>
                </GlassCard>

                <div className="space-y-4">
                  {roiBreakdown.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + (index * 0.1) }}
                    >
                      <GlassCard className="p-4 flex items-center justify-between hover:scale-[1.02] active:scale-[0.98] cursor-default group">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: item.color }} />
                          <span className="font-medium text-sm">{item.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold font-mono text-sm">{formatCurrency(item.value)}</div>
                          <div className="text-xs text-muted-foreground">
                            {((item.value / totalROI) * 100).toFixed(1)}%
                          </div>
                        </div>
                      </GlassCard>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Footer / Citations */}
          <footer className="pt-8 pb-4 text-center space-y-4 animate-in fade-in duration-1000 delay-500">
            <div className="flex flex-wrap justify-center gap-2">
              {Object.entries(citations).map(([key, data]) => (
                <Tooltip key={key}>
                  <TooltipTrigger asChild>
                    <Badge 
                      variant="outline" 
                      className="cursor-pointer hover:bg-teal-50 hover:text-teal-700 hover:border-teal-200 transition-colors py-1.5 px-3"
                      onClick={() => setShowCitation(key)}
                    >
                      {data.source.split(' ')[0]}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs text-xs">
                    <p className="font-semibold mb-1">{data.title}</p>
                    <p className="opacity-90 line-clamp-2">{data.text}</p>
                    <p className="mt-1 text-[10px] opacity-70">Click to read full citation</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
            <div className="text-xs text-muted-foreground max-w-2xl mx-auto space-y-2">
              <p>
                Disclaimer: These calculations are estimates based on industry research and standard assumptions. 
                Results should be customized to your specific environment.
              </p>
              <p className="opacity-60">
                Last updated: {new Date().toLocaleDateString()} • v2.0 Modern SaaS Edition
              </p>
            </div>
          </footer>
        </div>

        <CitationModal />
        <Toaster position="top-center" />
      </div>
    </TooltipProvider>
  )
}

// --- Subcomponents ---

function AssumptionSlider({ label, value, setValue, min, max, step, format = (v: any) => v, citation, onInfoClick }: any) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Label className="text-sm font-medium">{label}</Label>
          <Button variant="ghost" size="icon" className="h-5 w-5 text-muted-foreground hover:text-teal-600" onClick={() => onInfoClick(citation)}>
            <Info className="h-3.5 w-3.5" />
          </Button>
        </div>
        <Badge variant="secondary" className="font-mono">{format(value)}</Badge>
      </div>
      <Slider
        value={[value]}
        onValueChange={(vals) => setValue(vals[0])}
        min={min}
        max={max}
        step={step}
        className="[&>.relative>.absolute]:bg-teal-500"
      />
    </div>
  )
}

function MiniStat({ label, value, color }: any) {
  return (
    <div className="bg-slate-50/50 dark:bg-slate-800/50 rounded-lg p-3 text-center border border-slate-100 dark:border-slate-700">
      <div className="text-xs text-muted-foreground mb-1">{label}</div>
      <div className={cn("font-bold font-mono text-sm md:text-base truncate", color)}>
        {formatCurrency(value)}
      </div>
    </div>
  )
}

// --- Data ---
const citations = {
  passwordReset: {
    title: "Cost Per Password Reset",
    source: "Forrester Research",
    text: "The average cost of a single password reset is upwards of $70, including not just salary but also lost productivity and infrastructure overhead. This comprehensive figure accounts for the fully loaded cost of IT support time, including salary, benefits, overhead, and the productivity loss experienced by the employee waiting for resolution."
  },
  aiPhishing: {
    title: "AI-Powered Phishing Threat",
    source: "Dashlane Phishing 2.0 Report (2025) & Zscaler ThreatLabz 2025",
    text: "Since ChatGPT's launch in late 2022, phishing volume has surged by 4,151%. AI-generated phishing emails now have a 54% success rate, far above the 12% success rate of traditional attacks. Threat actors are using Generative AI to craft flawless phishing lures and realistic decoys, making it harder than ever for employees to spot fakes. Credential phishing now accounts for 70% of all email-based cyberattacks."
  },
  insurance: {
    title: "Cyber Insurance Premium Impact",
    source: "Push Security (Sept 2025) & CyberMaxx (Oct 2024)",
    text: "Roughly 20-25% of cyber insurance premiums are dictated by the security controls in place: MFA, EDR, regular patching, etc. Nearly 70% of organizations that renewed coverage saw premiums jump from 50% to above 100%. Real-world example: The City of Hamilton, Ontario had their $5 million insurance claim denied due to MFA gaps, leaving taxpayers to foot an $18.3 million bill."
  },
  breachCost: {
    title: "Average Cost of Credential-Related Breach",
    source: "IBM Cost of a Data Breach Report 2024",
    text: "The average cost of a data breach that originates from stolen or compromised credentials is $4.81 million. This figure represents the total financial impact including incident response, legal fees, regulatory fines, customer notification, business disruption, and reputational damage."
  },
  productivity: {
    title: "Employee Productivity Savings",
    source: "Beyond Identity - Taulia Case Study",
    text: "Taulia estimated that each employee saves about 10 minutes per day by eliminating password typing and password issues. That's 3 hours per month. With ~600 employees, that's 1,800 hours or 75 days per month that the company saves without passwords. Authentication time was reduced from 24.80 seconds to 8.22 seconds - a 16.58 second improvement."
  }
}

export default App
