import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'posapp',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
    AndroidBuilder: {
      builderOptions: {
        extraResources: ['src/post.db']
      }
    }
    
    // CapacitorSQLite: {
    //   androidIsEncryption: false,
    //   androidBiometric: {
    //     biometricAuth : false,
    //     biometricTitle : "Biometric login for capacitor sqlite",
    //     biometricSubTitle : "Log in using your biometric",
    //     builderOptions: {
    //       extraResources: ['post.db']
    //     }
    //   }
    // }
  },
};

export default config;
