import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function EmailVerification() {
  const { verifyEmail, isLoading } = useAuth();
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const handleVerification = async () => {
    if (!token) {
      setVerificationStatus('error');
      setErrorMessage('No verification token found. Please check your verification link.');
      return;
    }

    try {
      await verifyEmail(token);
      setVerificationStatus('success');
      navigate("/signin")
    } catch (error) {
      setVerificationStatus('error');
      setErrorMessage('Failed to verify email. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#9fb7fc] to-[#e8e7ff] p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Email Verification</h1>
        
        {verificationStatus === 'success' ? (
          <div className="text-center text-green-600">
            <p className="text-lg">Your email has been successfully verified!</p>
          </div>
        ) : verificationStatus === 'error' ? (
          <div className="text-center text-red-600">
            <p className="text-lg">{errorMessage}</p>
          </div>
        ) : (
          <div className="text-center">
            <p className="mb-6 text-gray-600">
              Please click the button below to verify your email address.
            </p>
            <button
              onClick={handleVerification}
              disabled={isLoading || !token}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 w-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  Verifying...
                </>
              ) : !token ? (
                'No Token Found'
              ) : (
                'Verify Email'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}