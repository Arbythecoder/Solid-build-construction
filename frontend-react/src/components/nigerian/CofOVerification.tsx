import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FileCheck, Upload, X, CheckCircle, AlertCircle,
  AlertTriangle, Clock, Shield, FileText, Download,
  Eye, Calendar, MapPin, User, Building, Hash
} from 'lucide-react'

interface VerificationResult {
  status: 'verified' | 'pending' | 'invalid' | 'expired'
  certificateNumber?: string
  propertyAddress?: string
  ownerName?: string
  issueDate?: string
  expiryDate?: string
  landSize?: string
  propertyType?: string
  state?: string
  lga?: string
  verifiedDate?: string
  notes?: string[]
}

const CofOVerification = () => {
  const [certificateNumber, setCertificateNumber] = useState('')
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<VerificationResult | null>(null)
  const [showGuide, setShowGuide] = useState(false)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Check file type
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg']
      if (!validTypes.includes(file.type)) {
        alert('Please upload a PDF or image file (JPEG, PNG)')
        return
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB')
        return
      }

      setUploadedFile(file)
    }
  }

  const handleVerify = async () => {
    if (!certificateNumber && !uploadedFile) {
      alert('Please enter a certificate number or upload a document')
      return
    }

    setLoading(true)

    // Simulate API call to verify C of O
    // In production, this would call a government API or your backend
    setTimeout(() => {
      // Mock verification result
      const mockResults: { [key: string]: VerificationResult } = {
        'LAG/2023/12345': {
          status: 'verified',
          certificateNumber: 'LAG/2023/12345',
          propertyAddress: '15 Atlantic Boulevard, Lekki Phase 1, Lagos',
          ownerName: 'John Doe',
          issueDate: '2023-03-15',
          expiryDate: '2122-03-15', // C of O typically lasts 99 years
          landSize: '500 sqm',
          propertyType: 'Residential',
          state: 'Lagos',
          lga: 'Eti-Osa',
          verifiedDate: new Date().toISOString(),
          notes: [
            'Certificate is authentic and valid',
            'No encumbrances or liens recorded',
            'Property boundaries verified',
            'All fees paid in full'
          ]
        },
        'LAG/2020/67890': {
          status: 'expired',
          certificateNumber: 'LAG/2020/67890',
          propertyAddress: '24 Bourdillon Road, Ikoyi, Lagos',
          ownerName: 'Jane Smith',
          issueDate: '1920-05-20',
          expiryDate: '2019-05-20',
          landSize: '750 sqm',
          propertyType: 'Commercial',
          state: 'Lagos',
          lga: 'Lagos Island',
          verifiedDate: new Date().toISOString(),
          notes: [
            'Certificate has expired',
            'Renewal required',
            'Contact Lagos State Land Bureau'
          ]
        },
        'default': {
          status: 'pending',
          certificateNumber: certificateNumber || 'Unknown',
          verifiedDate: new Date().toISOString(),
          notes: [
            'Verification request submitted',
            'Processing time: 3-5 business days',
            'You will receive an email notification'
          ]
        }
      }

      const result = mockResults[certificateNumber] || mockResults['default']
      setResult(result)
      setLoading(false)
    }, 2000)
  }

  const resetForm = () => {
    setCertificateNumber('')
    setUploadedFile(null)
    setResult(null)
  }

  const getStatusColor = (status: VerificationResult['status']) => {
    switch (status) {
      case 'verified':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'invalid':
        return 'text-red-600 bg-red-50 border-red-200'
      case 'expired':
        return 'text-orange-600 bg-orange-50 border-orange-200'
      case 'pending':
        return 'text-blue-600 bg-blue-50 border-blue-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getStatusIcon = (status: VerificationResult['status']) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-12 h-12 text-green-600" />
      case 'invalid':
        return <X className="w-12 h-12 text-red-600" />
      case 'expired':
        return <AlertTriangle className="w-12 h-12 text-orange-600" />
      case 'pending':
        return <Clock className="w-12 h-12 text-blue-600" />
      default:
        return <AlertCircle className="w-12 h-12 text-gray-600" />
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-luxury-gold/10 rounded-full mb-4">
          <FileCheck className="w-8 h-8 text-luxury-gold" />
        </div>
        <h1 className="text-4xl font-playfair font-bold text-premium-black mb-3">
          Certificate of Occupancy Verification
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          Verify the authenticity of property C of O documents in Nigeria
        </p>
        <button
          onClick={() => setShowGuide(true)}
          className="text-luxury-gold hover:text-luxury-gold/80 font-semibold"
        >
          What is a C of O? Learn more →
        </button>
      </div>

      {!result ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          {/* Verification Methods */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Method 1: Certificate Number */}
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Hash className="w-5 h-5 text-luxury-gold" />
                <h3 className="font-semibold text-gray-900">Enter Certificate Number</h3>
              </div>
              <input
                type="text"
                placeholder="e.g., LAG/2023/12345"
                value={certificateNumber}
                onChange={(e) => setCertificateNumber(e.target.value.toUpperCase())}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-luxury-gold"
              />
              <p className="text-xs text-gray-500 mt-2">
                Format: STATE/YEAR/NUMBER
              </p>
            </div>

            {/* Method 2: Upload Document */}
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Upload className="w-5 h-5 text-luxury-gold" />
                <h3 className="font-semibold text-gray-900">Upload C of O Document</h3>
              </div>
              <label className="block">
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="cursor-pointer border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-luxury-gold transition-colors text-center">
                  {uploadedFile ? (
                    <div className="flex items-center justify-center gap-2">
                      <FileText className="w-5 h-5 text-luxury-gold" />
                      <span className="text-sm text-gray-700">{uploadedFile.name}</span>
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          setUploadedFile(null)
                        }}
                        className="text-red-500 hover:text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Click to upload</p>
                      <p className="text-xs text-gray-500 mt-1">PDF, JPEG, PNG (max 5MB)</p>
                    </>
                  )}
                </div>
              </label>
            </div>
          </div>

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            disabled={loading || (!certificateNumber && !uploadedFile)}
            className="w-full py-4 bg-luxury-gold text-white rounded-xl font-semibold hover:bg-luxury-gold/90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                <Shield className="w-5 h-5" />
                Verify Certificate
              </>
            )}
          </button>

          {/* Trust Indicators */}
          <div className="mt-8 pt-8 border-t">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <Shield className="w-8 h-8 text-luxury-gold mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-900">Secure Verification</p>
                <p className="text-xs text-gray-600">End-to-end encryption</p>
              </div>
              <div>
                <Clock className="w-8 h-8 text-luxury-gold mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-900">Instant Results</p>
                <p className="text-xs text-gray-600">Real-time verification</p>
              </div>
              <div>
                <CheckCircle className="w-8 h-8 text-luxury-gold mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-900">Official Sources</p>
                <p className="text-xs text-gray-600">Government databases</p>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <VerificationResults result={result} onReset={resetForm} />
      )}

      {/* Information Guide Modal */}
      <AnimatePresence>
        {showGuide && <CofOGuide onClose={() => setShowGuide(false)} />}
      </AnimatePresence>
    </div>
  )
}

// Verification Results Component
const VerificationResults = ({
  result,
  onReset
}: {
  result: VerificationResult
  onReset: () => void
}) => {
  const getStatusColor = (status: VerificationResult['status']) => {
    switch (status) {
      case 'verified':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'invalid':
        return 'text-red-600 bg-red-50 border-red-200'
      case 'expired':
        return 'text-orange-600 bg-orange-50 border-orange-200'
      case 'pending':
        return 'text-blue-600 bg-blue-50 border-blue-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getStatusIcon = (status: VerificationResult['status']) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-12 h-12 text-green-600" />
      case 'invalid':
        return <X className="w-12 h-12 text-red-600" />
      case 'expired':
        return <AlertTriangle className="w-12 h-12 text-orange-600" />
      case 'pending':
        return <Clock className="w-12 h-12 text-blue-600" />
      default:
        return <AlertCircle className="w-12 h-12 text-gray-600" />
    }
  }

  const getStatusText = (status: VerificationResult['status']) => {
    switch (status) {
      case 'verified':
        return 'Certificate Verified'
      case 'invalid':
        return 'Invalid Certificate'
      case 'expired':
        return 'Certificate Expired'
      case 'pending':
        return 'Verification Pending'
      default:
        return 'Unknown Status'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden"
    >
      {/* Status Header */}
      <div className={`p-8 text-center border-b ${getStatusColor(result.status)}`}>
        <div className="inline-flex items-center justify-center mb-4">
          {getStatusIcon(result.status)}
        </div>
        <h2 className="text-2xl font-bold mb-2">{getStatusText(result.status)}</h2>
        {result.certificateNumber && (
          <p className="font-mono font-semibold">{result.certificateNumber}</p>
        )}
        <p className="text-sm mt-2 opacity-80">
          Verified on {new Date(result.verifiedDate || '').toLocaleDateString('en-NG')}
        </p>
      </div>

      {/* Certificate Details */}
      {result.status !== 'pending' && (
        <div className="p-8">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-luxury-gold" />
            Certificate Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.ownerName && (
              <DetailItem icon={<User />} label="Owner Name" value={result.ownerName} />
            )}
            {result.propertyAddress && (
              <DetailItem icon={<MapPin />} label="Property Address" value={result.propertyAddress} />
            )}
            {result.propertyType && (
              <DetailItem icon={<Building />} label="Property Type" value={result.propertyType} />
            )}
            {result.landSize && (
              <DetailItem icon={<FileText />} label="Land Size" value={result.landSize} />
            )}
            {result.state && (
              <DetailItem icon={<MapPin />} label="State" value={result.state} />
            )}
            {result.lga && (
              <DetailItem icon={<MapPin />} label="LGA" value={result.lga} />
            )}
            {result.issueDate && (
              <DetailItem
                icon={<Calendar />}
                label="Issue Date"
                value={new Date(result.issueDate).toLocaleDateString('en-NG')}
              />
            )}
            {result.expiryDate && (
              <DetailItem
                icon={<Calendar />}
                label="Expiry Date"
                value={new Date(result.expiryDate).toLocaleDateString('en-NG')}
              />
            )}
          </div>
        </div>
      )}

      {/* Notes */}
      {result.notes && result.notes.length > 0 && (
        <div className="px-8 pb-8">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-luxury-gold" />
            Important Notes
          </h3>
          <ul className="space-y-2">
            {result.notes.map((note, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-700">
                <CheckCircle className="w-4 h-4 text-luxury-gold mt-0.5 flex-shrink-0" />
                <span className="text-sm">{note}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Actions */}
      <div className="px-8 pb-8 flex gap-3">
        <button
          onClick={onReset}
          className="flex-1 py-3 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
        >
          Verify Another Certificate
        </button>
        {result.status === 'verified' && (
          <button className="flex-1 py-3 bg-luxury-gold text-white rounded-xl font-semibold hover:bg-luxury-gold/90 transition-colors flex items-center justify-center gap-2">
            <Download className="w-4 h-4" />
            Download Report
          </button>
        )}
      </div>
    </motion.div>
  )
}

// Detail Item Component
const DetailItem = ({
  icon,
  label,
  value
}: {
  icon: React.ReactNode
  label: string
  value: string
}) => {
  return (
    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
      <div className="text-gray-400 mt-0.5">{icon}</div>
      <div>
        <p className="text-xs text-gray-600 mb-1">{label}</p>
        <p className="font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  )
}

// C of O Guide Modal
const CofOGuide = ({ onClose }: { onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-2xl font-playfair font-bold text-premium-black">
            About Certificate of Occupancy (C of O)
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <section>
            <h3 className="font-semibold text-gray-900 mb-2">What is a C of O?</h3>
            <p className="text-gray-700 leading-relaxed">
              A Certificate of Occupancy (C of O) is a legal document issued by the government
              that certifies the legal ownership of land or property in Nigeria. It is the
              highest form of land title document and provides the most security for property
              ownership.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-gray-900 mb-2">Why is it Important?</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Proves legal ownership of the property</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Required for property transactions (buying/selling)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Needed to secure bank loans and mortgages</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Protects against fraudulent claims</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Grants development and building rights</span>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold text-gray-900 mb-2">How to Verify a C of O</h3>
            <ol className="space-y-2 text-gray-700 list-decimal list-inside">
              <li>Obtain the C of O certificate number from the seller</li>
              <li>Enter the certificate number in our verification tool</li>
              <li>Or upload a scanned copy of the document</li>
              <li>Review the verification results</li>
              <li>Consult a lawyer if you have any concerns</li>
            </ol>
          </section>

          <section className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-yellow-900 mb-1">Important Warning</h4>
                <p className="text-sm text-yellow-800">
                  Always verify C of O documents before purchasing property. Consult with a
                  qualified real estate lawyer and conduct thorough due diligence.
                  Solid Build provides this tool as a convenience but recommends professional
                  legal advice for all property transactions.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="font-semibold text-gray-900 mb-2">Common Issues to Watch For</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <span>Forged or fake C of O documents</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <span>Expired certificates</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <span>Property under government acquisition</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <span>Multiple claims on the same property</span>
              </li>
            </ul>
          </section>
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="w-full py-3 bg-luxury-gold text-white rounded-xl font-semibold hover:bg-luxury-gold/90 transition-colors"
          >
            Got it, thanks!
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default CofOVerification
