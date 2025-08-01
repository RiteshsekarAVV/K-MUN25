import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  User, 
  Mail, 
  Phone, 
  School, 
  GraduationCap, 
  Upload,
  Check,
  AlertCircle,
  Users
} from 'lucide-react';

interface RegistrationForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  isKumaraguru: string;
  rollNumber?: string;
  institutionType?: string;
  institution?: string;
  grade?: string;
  totalMuns: string;
  committeePreference1: string;
  portfolioPreference1: string;
  committeePreference2: string;
  portfolioPreference2: string;
  committeePreference3: string;
  portfolioPreference3: string;
  idDocument: FileList;
  munResume?: FileList;
  terms: boolean;
}

const Register: React.FC = () => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger
  } = useForm<RegistrationForm>();

  const isKumaraguru = watch('isKumaraguru');

  const committees = [
    { name: 'United Nations Security Council', portfolios: ['United States', 'China', 'Russia', 'United Kingdom', 'France'] },
    { name: 'General Assembly First Committee', portfolios: ['India', 'Germany', 'Japan', 'Brazil', 'South Africa'] },
    { name: 'Economic and Social Council', portfolios: ['Canada', 'Australia', 'Mexico', 'Argentina', 'Egypt'] },
    { name: 'Human Rights Council', portfolios: ['Netherlands', 'Sweden', 'Norway', 'Switzerland', 'Belgium'] },
    { name: 'International Court of Justice', portfolios: ['Judge from India', 'Judge from USA', 'Judge from UK', 'Judge from France'] },
    { name: 'World Health Organization', portfolios: ['WHO Director', 'India', 'USA', 'China', 'Germany'] }
  ];

  const getPortfoliosForCommittee = (committeeName: string) => {
    const committee = committees.find(c => c.name === committeeName);
    return committee ? committee.portfolios : [];
  };

  const onSubmit = async (data: RegistrationForm) => {
    console.log('Registration Data:', data);
    setSubmitted(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Navigate to success page or login
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  const nextStep = async () => {
    const isValid = await trigger();
    if (isValid) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Registration Successful!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for registering for Kumaraguru MUN 2025. You will receive a confirmation email shortly.
          </p>
          <div className="space-y-2 text-sm text-gray-500">
            <p>• Check your email for confirmation</p>
            <p>• Complete payment to secure your spot</p>
            <p>• Committee allocation will be announced soon</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-800 to-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">MUN</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Register for Kumaraguru MUN 2025
          </h1>
          <p className="text-gray-600">
            Join the most prestigious Model United Nations conference in South India
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    i <= step
                      ? 'bg-blue-800 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {i}
                </div>
                {i < 3 && (
                  <div
                    className={`w-12 h-1 ${
                      i < step ? 'bg-blue-800' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-2">
            <div className="flex space-x-16 text-sm text-gray-600">
              <span className={step >= 1 ? 'text-blue-800 font-medium' : ''}>
                Personal Info
              </span>
              <span className={step >= 2 ? 'text-blue-800 font-medium' : ''}>
                Preferences
              </span>
              <span className={step >= 3 ? 'text-blue-800 font-medium' : ''}>
                Documents
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h2>
                
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <div className="relative">
                      <input
                        {...register('firstName', { required: 'First name is required' })}
                        className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your first name"
                      />
                      <User className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                    </div>
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <div className="relative">
                      <input
                        {...register('lastName', { required: 'Last name is required' })}
                        className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your last name"
                      />
                      <User className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                    </div>
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <input
                        {...register('email', { 
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address'
                          }
                        })}
                        type="email"
                        className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="your.email@example.com"
                      />
                      <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <input
                        {...register('phone', { required: 'Phone number is required' })}
                        type="tel"
                        className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="+91 98765 43210"
                      />
                      <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender *
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        {...register('gender', { required: 'Gender is required' })}
                        type="radio"
                        value="male"
                        className="mr-2"
                      />
                      Male
                    </label>
                    <label className="flex items-center">
                      <input
                        {...register('gender', { required: 'Gender is required' })}
                        type="radio"
                        value="female"
                        className="mr-2"
                      />
                      Female
                    </label>
                  </div>
                  {errors.gender && (
                    <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
                  )}
                </div>

                {/* Kumaraguru Institution Question */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Are you from Kumaraguru Institutions? *
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        {...register('isKumaraguru', { required: 'This field is required' })}
                        type="radio"
                        value="yes"
                        className="mr-2"
                      />
                      Yes
                    </label>
                    <label className="flex items-center">
                      <input
                        {...register('isKumaraguru', { required: 'This field is required' })}
                        type="radio"
                        value="no"
                        className="mr-2"
                      />
                      No
                    </label>
                  </div>
                  {errors.isKumaraguru && (
                    <p className="mt-1 text-sm text-red-600">{errors.isKumaraguru.message}</p>
                  )}
                </div>

                {/* Conditional Fields */}
                {isKumaraguru === 'yes' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Roll Number *
                    </label>
                    <input
                      {...register('rollNumber', { required: 'Roll number is required' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your roll number"
                    />
                    {errors.rollNumber && (
                      <p className="mt-1 text-sm text-red-600">{errors.rollNumber.message}</p>
                    )}
                  </div>
                )}

                {isKumaraguru === 'no' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type of Institution *
                      </label>
                      <select
                        {...register('institutionType', { required: 'Institution type is required' })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select institution type</option>
                        <option value="school">School</option>
                        <option value="college">College</option>
                        <option value="company">Company</option>
                      </select>
                      {errors.institutionType && (
                        <p className="mt-1 text-sm text-red-600">{errors.institutionType.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Institution *
                      </label>
                      <div className="relative">
                        <input
                          {...register('institution', { required: 'Institution is required' })}
                          className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Your school/college/company"
                        />
                        <School className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                      </div>
                      {errors.institution && (
                        <p className="mt-1 text-sm text-red-600">{errors.institution.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Grade/Year *
                      </label>
                      <div className="relative">
                        <select
                          {...register('grade', { required: 'Grade/Year is required' })}
                          className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Select your grade/year</option>
                          <option value="high-school-9">High School - Grade 9</option>
                          <option value="high-school-10">High School - Grade 10</option>
                          <option value="high-school-11">High School - Grade 11</option>
                          <option value="high-school-12">High School - Grade 12</option>
                          <option value="undergraduate-1">Undergraduate - Year 1</option>
                          <option value="undergraduate-2">Undergraduate - Year 2</option>
                          <option value="undergraduate-3">Undergraduate - Year 3</option>
                          <option value="undergraduate-4">Undergraduate - Year 4</option>
                          <option value="undergraduate-5">Undergraduate - Year 5</option>
                          <option value="postgraduate-1">Postgraduate - Year 1</option>
                          <option value="postgraduate-2">Postgraduate - Year 2</option>
                          <option value="working-professional">Working Professional</option>
                        </select>
                        <GraduationCap className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                      </div>
                      {errors.grade && (
                        <p className="mt-1 text-sm text-red-600">{errors.grade.message}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Total MUNs */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total number of MUNs attended *
                  </label>
                  <select
                    {...register('totalMuns', { required: 'This field is required' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select number of MUNs</option>
                    <option value="0">0 (First time)</option>
                    <option value="1-2">1-2</option>
                    <option value="3-5">3-5</option>
                    <option value="6-10">6-10</option>
                    <option value="10+">10+</option>
                  </select>
                  {errors.totalMuns && (
                    <p className="mt-1 text-sm text-red-600">{errors.totalMuns.message}</p>
                  )}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6">Committee & Portfolio Preferences</h2>
                
                <p className="text-sm text-gray-600 mb-6">
                  Select your top 3 committee and portfolio preferences in order of preference.
                </p>
                
                <div className="space-y-8">
                  {[1, 2, 3].map((num) => (
                    <div key={num} className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Preference {num}</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Committee Preference {num} *
                          </label>
                          <select
                            {...register(`committeePreference${num}` as keyof RegistrationForm, {
                              required: `Committee preference ${num} is required`
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Select a committee</option>
                            {committees.map((committee) => (
                              <option key={committee.name} value={committee.name}>
                                {committee.name}
                              </option>
                            ))}
                          </select>
                          {errors[`committeePreference${num}` as keyof RegistrationForm] && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors[`committeePreference${num}` as keyof RegistrationForm]?.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Portfolio Preference {num} *
                          </label>
                          <select
                            {...register(`portfolioPreference${num}` as keyof RegistrationForm, {
                              required: `Portfolio preference ${num} is required`
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Select a portfolio</option>
                            {getPortfoliosForCommittee(watch(`committeePreference${num}` as keyof RegistrationForm) || '').map((portfolio) => (
                              <option key={portfolio} value={portfolio}>
                                {portfolio}
                              </option>
                            ))}
                          </select>
                          {errors[`portfolioPreference${num}` as keyof RegistrationForm] && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors[`portfolioPreference${num}` as keyof RegistrationForm]?.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6">Document Upload</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Student ID / Company ID / Aadhar Card *
                  </label>
                  <p className="text-sm text-gray-600 mb-4">
                    Upload a clear photo of your ID for verification.
                  </p>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-400 transition-colors">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="id-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-800 hover:text-blue-900 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="id-upload"
                            {...register('idDocument', { required: 'ID document is required' })}
                            type="file"
                            accept="image/*,.pdf"
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, PDF up to 10MB
                      </p>
                    </div>
                  </div>
                  {errors.idDocument && (
                    <p className="mt-1 text-sm text-red-600">{errors.idDocument.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    MUN Resume (Optional)
                  </label>
                  <p className="text-sm text-gray-600 mb-4">
                    Upload your MUN experience resume if available.
                  </p>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-400 transition-colors">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="resume-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-800 hover:text-blue-900 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="resume-upload"
                            {...register('munResume')}
                            type="file"
                            accept=".pdf,.doc,.docx"
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PDF, DOC, DOCX up to 10MB
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex">
                    <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">Important Notes:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Registration fee: ₹150 (Early Bird) / ₹200 (Regular)</li>
                        <li>Payment must be completed within 48 hours of registration</li>
                        <li>Committee allocation will be based on preferences and availability</li>
                        <li>All documents will be verified before final confirmation</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    id="terms"
                    {...register('terms', { required: 'You must accept the terms and conditions' })}
                    type="checkbox"
                    className="h-4 w-4 text-blue-800 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                    I agree to the{' '}
                    <Link to="/terms-of-service" className="text-blue-800 hover:text-blue-900">
                      Terms and Conditions
                    </Link>
                    ,{' '}
                    <Link to="/delegate-guidelines" className="text-blue-800 hover:text-blue-900">
                      Delegate Guidelines
                    </Link>
                    {' '}and{' '}
                    <Link to="/privacy-policy" className="text-blue-800 hover:text-blue-900">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
                {errors.terms && (
                  <p className="text-sm text-red-600">{errors.terms.message}</p>
                )}
              </motion.div>
            )}

            <div className="flex justify-between mt-8">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Previous
                </button>
              )}
              
              {step < 3 && (
                <button
                  type="button"
                  onClick={nextStep}
                  className="ml-auto px-6 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors"
                >
                  Next
                </button>
              )}
              
              {step === 3 && (
                <button
                  type="submit"
                  className="ml-auto px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Submit Registration
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-800 hover:text-blue-900 font-medium">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;