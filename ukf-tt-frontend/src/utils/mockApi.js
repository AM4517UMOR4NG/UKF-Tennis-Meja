// Mock API untuk testing pendaftaran
export const mockRegisterAPI = async (formData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Get form data
  const data = {};
  for (let [key, value] of formData.entries()) {
    data[key] = value;
  }
  
  // Validate required fields
  if (!data.fullName || !data.studentId) {
    throw new Error('Nama lengkap dan NIM wajib diisi');
  }
  
  // Simulate random success/error for testing
  const isSuccess = Math.random() > 0.2; // 80% success rate
  
  if (!isSuccess) {
    throw new Error('Terjadi kesalahan server. Silakan coba lagi.');
  }
  
  // Generate mock registration ID
  const registrationId = 'TM' + Date.now().toString().slice(-6);
  
  return {
    data: {
      success: true,
      message: 'Pendaftaran berhasil! Kami akan menghubungi Anda dalam 1-2 hari kerja.',
      registrationId: registrationId,
      memberData: {
        fullName: data.fullName,
        studentId: data.studentId,
        email: data.email,
        faculty: data.faculty,
        studyProgram: data.studyProgram,
        year: data.year,
        phone: data.phone,
        interests: data.interests ? data.interests.split(',') : [],
        registeredAt: new Date().toISOString()
      }
    }
  };
};

// Function to check if we should use mock API
export const shouldUseMockAPI = () => {
  return !import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_USE_MOCK_API === 'true';
};
