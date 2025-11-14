import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import AnimatedShaderBackground from '../components/ui/animated-shader-background';
import { mockRegisterAPI, shouldUseMockAPI } from '../utils/mockApi';
import MobileNavbar from '../components/layout/MobileNavbar';

const schema = yup.object({
  fullName: yup.string().required('Nama diperlukan').min(3, 'Minimal 3 karakter'),
  studentId: yup.string().required('NIM diperlukan'),
  email: yup.string().email('Format email tidak valid').nullable(),
  year: yup.number().typeError('Tahun harus angka').nullable().min(1900).max(2100),
  agreeToTerms: yup.boolean().oneOf([true], 'Anda harus menyetujui syarat'),
});

export default function RegisterNoAccount() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm({ resolver: yupResolver(schema), defaultValues: { interests: [] } });
  const [preview, setPreview] = useState(null);
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) { setPreview(null); return; }
    if (file.size > 5 * 1024 * 1024) { setServerError('Ukuran foto maksimal 5MB'); setValue('photo', null); return; }
    setPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (data) => {
    setServerError('');
    try {
      const formData = new FormData();
      formData.append('fullName', data.fullName);
      formData.append('studentId', data.studentId);
      if (data.email) formData.append('email', data.email);
      if (data.faculty) formData.append('faculty', data.faculty);
      if (data.studyProgram) formData.append('studyProgram', data.studyProgram);
      if (data.year) formData.append('year', data.year);
      if (data.phone) formData.append('phone', data.phone);
      if (data.interests && data.interests.length) formData.append('interests', data.interests.join(','));
      if (data.photo && data.photo.length > 0) formData.append('photo', data.photo[0]);

      let resp;
      
      // Use mock API if backend is not available or in development
      if (shouldUseMockAPI()) {
        console.log('🧪 Using Mock API for testing');
        resp = await mockRegisterAPI(formData);
      } else {
        console.log('🌐 Using Real API');
        resp = await api.post('/registrations', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      if (resp.data?.success) {
        navigate('/register/success', { 
          state: { 
            message: resp.data.message, 
            id: resp.data.registrationId,
            memberData: resp.data.memberData 
          } 
        });
      } else {
        setServerError(resp.data?.message || 'Terjadi kesalahan');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setServerError(err.message || err.response?.data?.message || 'Gagal mengirim. Coba lagi nanti.');
    }
  };

  return (
    <>
      {/* MOBILE NAVIGATION */}
      <MobileNavbar />
      
      <div className="relative max-w-4xl mx-auto p-6 pt-16">
        {/* Animated Shader Background */}
        <AnimatedShaderBackground />
        
        {/* Content */}
        <div className="relative z-10">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 via-cyan-500 to-purple-600 rounded-full mb-4 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Pendaftaran Anggota Baru</h1>
          <p className="text-gray-300">Bergabunglah dengan UKF Table Tennis — Pendaftaran mudah tanpa akun</p>
        </div>

        <div className="card bg-gray-900/80 backdrop-blur-sm border-gray-700/50">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information */}
          <div className="border-b border-gray-700 pb-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <span className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">1</span>
              Informasi Pribadi
            </h2>
            <div className="space-y-4 mt-4">
              <div>
                <label className="block font-semibold text-white mb-2">Nama Lengkap <span className="text-cyan-400">*</span></label>
                <input {...register('fullName')} className="input-field bg-gray-800/50 border-gray-600 text-white placeholder-gray-400" placeholder="Masukkan nama lengkap Anda" />
                {errors.fullName && <p className="text-red-400 text-sm mt-1 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.fullName.message}
                </p>}
              </div>

              <div>
                <label className="block font-semibold text-white mb-2">NIM <span className="text-cyan-400">*</span></label>
                <input {...register('studentId')} className="input-field bg-gray-800/50 border-gray-600 text-white placeholder-gray-400" placeholder="Masukkan NIM Anda" />
                {errors.studentId && <p className="text-red-400 text-sm mt-1 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.studentId.message}
                </p>}
              </div>

              <div>
                <label className="block font-semibold text-white mb-2">Email</label>
                <input {...register('email')} type="email" className="input-field bg-gray-800/50 border-gray-600 text-white placeholder-gray-400" placeholder="email@kampus.ac.id" />
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-white mb-2">Angkatan (Tahun)</label>
                  <input {...register('year')} type="number" className="input-field bg-gray-800/50 border-gray-600 text-white placeholder-gray-400" placeholder="2025" />
                  {errors.year && <p className="text-red-400 text-sm mt-1">{errors.year.message}</p>}
                </div>
                <div>
                  <label className="block font-semibold text-white mb-2">Nomor Telepon</label>
                  <input {...register('phone')} className="input-field bg-gray-800/50 border-gray-600 text-white placeholder-gray-400" placeholder="+62..." />
                </div>
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div className="border-b border-gray-700 pb-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <span className="bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">2</span>
              Informasi Akademik
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block font-semibold text-white mb-2">Fakultas</label>
                <input {...register('faculty')} className="input-field bg-gray-800/50 border-gray-600 text-white placeholder-gray-400" placeholder="Nama fakultas" />
              </div>
              <div>
                <label className="block font-semibold text-white mb-2">Program Studi</label>
                <input {...register('studyProgram')} className="input-field bg-gray-800/50 border-gray-600 text-white placeholder-gray-400" placeholder="Nama program studi" />
              </div>
            </div>
          </div>

          {/* Interests */}
          <div className="border-b border-gray-700 pb-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <span className="bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">3</span>
              Minat & Ketertarikan
            </h2>
            <div className="flex gap-4 flex-wrap mt-4">
              <label className="inline-flex items-center px-4 py-2 bg-gray-800/50 rounded-lg cursor-pointer hover:bg-cyan-500/20 border-2 border-transparent hover:border-cyan-500/50 transition-all">
                <input type="checkbox" value="kompetisi" {...register('interests')} className="w-4 h-4 text-cyan-500 rounded focus:ring-cyan-500" />
                <span className="ml-2 font-medium text-white">🏆 Kompetisi</span>
              </label>
              <label className="inline-flex items-center px-4 py-2 bg-gray-800/50 rounded-lg cursor-pointer hover:bg-cyan-500/20 border-2 border-transparent hover:border-cyan-500/50 transition-all">
                <input type="checkbox" value="coaching" {...register('interests')} className="w-4 h-4 text-cyan-500 rounded focus:ring-cyan-500" />
                <span className="ml-2 font-medium text-white">👨‍🏫 Coaching</span>
              </label>
              <label className="inline-flex items-center px-4 py-2 bg-gray-800/50 rounded-lg cursor-pointer hover:bg-cyan-500/20 border-2 border-transparent hover:border-cyan-500/50 transition-all">
                <input type="checkbox" value="relawan" {...register('interests')} className="w-4 h-4 text-cyan-500 rounded focus:ring-cyan-500" />
                <span className="ml-2 font-medium text-white">🤝 Relawan</span>
              </label>
            </div>
          </div>

          {/* Photo Upload */}
          <div className="border-b border-gray-700 pb-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <span className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">4</span>
              Foto Profil
            </h2>
            <div className="mt-4">
              <label className="block font-semibold text-white mb-2">Upload Foto (maks. 5MB)</label>
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-cyan-400 transition-colors bg-gray-800/30">
                <input
                  type="file"
                  accept="image/*"
                  {...register('photo')}
                  onChange={(e) => { register('photo').onChange(e); handlePhotoChange(e); }}
                  className="hidden"
                  id="photo-upload"
                />
                <label htmlFor="photo-upload" className="cursor-pointer">
                  {preview ? (
                    <div className="space-y-2">
                      <img src={preview} alt="preview" className="mx-auto max-w-xs rounded-lg shadow-md border-2 border-gray-600" />
                      <p className="text-sm text-gray-300">Klik untuk mengganti foto</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <svg className="mx-auto w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-gray-300">Klik untuk upload foto</p>
                    </div>
                  )}
                </label>
              </div>
            </div>
          </div>

          {/* Terms */}
          <div>
            <label className="inline-flex items-start cursor-pointer">
              <input 
                type="checkbox" 
                {...register('agreeToTerms')} 
                className="mt-1 w-5 h-5 text-cyan-500 rounded focus:ring-cyan-500"
              />
              <span className="ml-3 text-gray-300">
                Saya menyetujui <span className="text-cyan-400 font-semibold">syarat & ketentuan</span> yang berlaku
              </span>
            </label>
            {errors.agreeToTerms && <p className="text-red-400 text-sm mt-2 ml-8">{errors.agreeToTerms.message}</p>}
          </div>

          {serverError && (
            <div className="bg-red-900/30 border-l-4 border-red-500 p-4 rounded">
              <p className="text-red-300 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {serverError}
              </p>
            </div>
          )}

          <div className="pt-4">
            <button 
              type="submit" 
              disabled={isSubmitting} 
              className="btn-primary w-full py-3 text-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Mengirim...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Kirim Pendaftaran
                </span>
              )}
            </button>
          </div>
        </form>
        </div>
      </div>
      </div>
    </>
  );
}

