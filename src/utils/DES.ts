import CryptoJS from "crypto-js";
import iconv from "iconv-lite";
import { Buffer } from "buffer";

const iv = CryptoJS.enc.Utf8.parse('univlive'); // 与Java代码中的IV相同
const DESKey = CryptoJS.enc.Utf8.parse('85281581'); // 与Java代码中的密钥相同

export function encryptDES(encryptString: string): string {
  const encryptedData = CryptoJS.DES.encrypt(encryptString, DESKey, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encryptedData.toString();
}

export function decryptDES(decryptString: string): string {
  const decryptedData = CryptoJS.DES.decrypt(decryptString, DESKey, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  const bytes = decryptedData.toString(CryptoJS.enc.Latin1);
  return iconv.decode(Buffer.from(bytes, 'binary'), 'GBK');
}
