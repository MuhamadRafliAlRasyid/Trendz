import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.trenz.app', // Ganti sesuai format unik: com.namaapp.nama
  appName: 'Trenz',
  webDir: 'www',
  bundledWebRuntime: false, // disarankan false jika pakai Ionic CLI untuk build
  server: {
    androidScheme: 'http' // untuk debugging HTTP di emulator Android
  }
};

export default config;
