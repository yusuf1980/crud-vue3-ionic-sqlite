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
  // server: {
    // url: "http://localhost:8100",
    // hostname: "192.168.10.195",
    // hostname: "10.0.2.2",
    // cleartext: true
  // },
};

export default config;
