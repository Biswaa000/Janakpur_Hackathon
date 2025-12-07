import { useState } from 'react';
import { Shield, Building, Mail, Lock, CheckCircle, Users, FileCheck, Clock, ArrowRight, Globe } from 'lucide-react';
import InputField from '../components/InputField';
import Button from '../components/Button';
import ngoService from '../services/ngoService';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ ngoName: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate passwords match
    if (form.password !== form.confirmPassword) {
      setMessage('Passwords do not match');
      setMessageType('error');
      return;
    }

    // Validate password strength
    if (form.password.length < 8) {
      setMessage('Password must be at least 8 characters long');
      setMessageType('error');
      return;
    }

    setLoading(true);
    setMessage('');
    setMessageType('');

    try {
      // Send all form data including confirmPassword
      await ngoService.register(form);
      setMessage('Registration submitted successfully! Your account is pending verification.');
      setMessageType('success');
      setForm({ ngoName: '', email: '', password: '', confirmPassword: '' });
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed. Please try again.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600/20 backdrop-blur-sm rounded-2xl border border-blue-500/30 mb-6">
            <Shield className="h-10 w-10 text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Register Your <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Organization</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Join our network of verified NGOs to access anonymous incident reports and help make communities safer.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-8 shadow-2xl">
              <div className="flex items-center justify-center space-x-3 mb-8">
                <Building className="h-8 w-8 text-blue-400" />
                <h2 className="text-3xl font-bold text-white">Organization Registration</h2>
              </div>

              {/* Message Display */}
              {message && (
                <div className={`mb-8 p-4 rounded-xl border ${messageType === 'success' ? 'bg-green-900/20 border-green-700' : 'bg-red-900/20 border-red-700'}`}>
                  <div className="flex items-center space-x-3">
                    {messageType === 'success' ? (
                      <CheckCircle className="h-6 w-6 text-green-400" />
                    ) : (
                      <Shield className="h-6 w-6 text-red-400" />
                    )}
                    <div>
                      <p className={`font-medium ${messageType === 'success' ? 'text-green-300' : 'text-red-300'}`}>
                        {message}
                      </p>
                      {messageType === 'success' && (
                        <p className="text-sm text-green-400/80 mt-1">
                          Redirecting to login in 3 seconds...
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* NGO Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <div className="flex items-center space-x-2">
                      <Building className="h-5 w-5 text-blue-400" />
                      <span>Organization Name *</span>
                    </div>
                  </label>
                  <InputField
                    label=""
                    name="ngoName"
                    value={form.ngoName}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Human Rights Watch International"
                    className="bg-gray-900/50 border-gray-700 focus:border-blue-500 focus:ring-blue-500/20"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-5 w-5 text-blue-400" />
                      <span>Organization Email *</span>
                    </div>
                  </label>
                  <InputField
                    label=""
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="admin@organization.org"
                    className="bg-gray-900/50 border-gray-700 focus:border-blue-500 focus:ring-blue-500/20"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <div className="flex items-center space-x-2">
                      <Lock className="h-5 w-5 text-blue-400" />
                      <span>Password *</span>
                    </div>
                  </label>
                  <InputField
                    label=""
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    placeholder="Minimum 8 characters"
                    className="bg-gray-900/50 border-gray-700 focus:border-blue-500 focus:ring-blue-500/20"
                  />
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <div className={`flex items-center space-x-2 ${form.password.length >= 8 ? 'text-green-400' : 'text-gray-400'}`}>
                      <div className={`w-2 h-2 rounded-full ${form.password.length >= 8 ? 'bg-green-400' : 'bg-gray-600'}`}></div>
                      <span className="text-xs">8+ characters</span>
                    </div>
                    <div className={`flex items-center space-x-2 ${/[A-Z]/.test(form.password) ? 'text-green-400' : 'text-gray-400'}`}>
                      <div className={`w-2 h-2 rounded-full ${/[A-Z]/.test(form.password) ? 'bg-green-400' : 'bg-gray-600'}`}></div>
                      <span className="text-xs">Uppercase letter</span>
                    </div>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <div className="flex items-center space-x-2">
                      <Lock className="h-5 w-5 text-blue-400" />
                      <span>Confirm Password *</span>
                    </div>
                  </label>
                  <InputField
                    label=""
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder="Re-enter your password"
                    className={`bg-gray-900/50 border ${form.confirmPassword && form.password !== form.confirmPassword ? 'border-red-500' : 'border-gray-700'} focus:border-blue-500 focus:ring-blue-500/20`}
                  />
                  {form.confirmPassword && form.password !== form.confirmPassword && (
                    <p className="mt-2 text-sm text-red-400">Passwords do not match</p>
                  )}
                </div>

                {/* Terms Agreement */}
                <div className="pt-4">
                  <label className="flex items-start space-x-3 p-4 bg-gray-900/30 rounded-xl border border-gray-700">
                    <input
                      type="checkbox"
                      required
                      className="mt-1 w-5 h-5 text-blue-600 bg-gray-800 border-gray-700 rounded focus:ring-blue-500/20"
                    />
                    <div className="space-y-2">
                      <p className="text-white font-medium">Agree to Terms & Verification</p>
                      <p className="text-gray-400 text-sm">
                        I confirm that our organization is a legitimate NGO and agree to the verification process. 
                        We will use the platform responsibly and maintain the confidentiality of all reports.
                      </p>
                    </div>
                  </label>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  loading={loading}
                  className="w-full py-4 text-lg font-semibold mt-6"
                  icon={Shield}
                >
                  {loading ? 'Submitting Registration...' : 'Submit for Verification'}
                </Button>

                {/* Login Link */}
                <div className="pt-6 text-center">
                  <p className="text-gray-400">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center space-x-1">
                      <span>Sign In</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column - Information */}
          <div className="space-y-6">
            {/* Verification Process */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                <FileCheck className="h-5 w-5 text-green-400" />
                <span>Verification Process</span>
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-blue-300">1</span>
                  </div>
                  <div>
                    <p className="font-medium text-white">Submit Registration</p>
                    <p className="text-sm text-gray-400">Fill in your organization details</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-blue-300">2</span>
                  </div>
                  <div>
                    <p className="font-medium text-white">Document Review</p>
                    <p className="text-sm text-gray-400">Our team verifies NGO credentials</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-blue-300">3</span>
                  </div>
                  <div>
                    <p className="font-medium text-white">Approval & Access</p>
                    <p className="text-sm text-gray-400">Receive dashboard access</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-blue-900/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-700/30">
              <h3 className="text-xl font-bold text-white mb-4">✨ NGO Benefits</h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <Users className="h-4 w-4 text-blue-400" />
                  <span className="text-sm text-gray-300">Access anonymous community reports</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Globe className="h-4 w-4 text-blue-400" />
                  <span className="text-sm text-gray-300">Join verified NGO network</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Shield className="h-4 w-4 text-blue-400" />
                  <span className="text-sm text-gray-300">Secure evidence repository</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Clock className="h-4 w-4 text-blue-400" />
                  <span className="text-sm text-gray-300">24/7 incident monitoring</span>
                </li>
              </ul>
            </div>

            {/* Processing Time */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <Clock className="h-6 w-6 text-amber-400" />
                <h3 className="text-xl font-bold text-white">Processing Time</h3>
              </div>
              <p className="text-gray-300 mb-3">
                Verification typically takes <span className="text-amber-400 font-bold">1-3 business days</span>.
              </p>
              <div className="bg-gray-900/50 rounded-lg p-3">
                <p className="text-sm text-gray-400">
                  <span className="text-blue-400 font-medium">Note:</span> You'll receive an email once your account is verified.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 text-sm text-gray-500">
            <Shield className="h-4 w-4" />
            <span>All organization data is encrypted and protected under GDPR guidelines</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;