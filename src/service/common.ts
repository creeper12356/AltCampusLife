import {decryptDES, encryptDES} from '../utils/DES.ts';
import {XMLParser} from 'fast-xml-parser';
export const PREFIX =
  'http://kld.sjtu.edu.cn:80/campuslifedispatch/WebService.asmx';
export const LOGIN_URL =
  'http://kld.sjtu.edu.cn:80/campuslife/WebService.asmx/UserService';
export const USER_URL = `${PREFIX}/UserService`;
export const CHARGE_URL = `${PREFIX}/ChargeService`;

const userAgent = 'okhttp/2.7.5';

const post = async (url: string, body: any): Promise<string> => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': userAgent,
    },
    body: new URLSearchParams(body).toString(),
    redirect: 'follow',
  });
  return response.text();
};

export const postOrder = async (
  url: string,
  order: object,
): Promise<object> => {
  const encryptedOrder = encryptDES(JSON.stringify(order));
  const responseString = decryptDES(
    parseXml(await post(url, {order: encryptedOrder})),
  );
  return JSON.parse(responseString);
};

const parseXml = (xml: string): string => {
  const options = {
    attributeNamePrefix: '@_', // 属性名称前缀
    ignoreAttributes: false, // 不忽略属性
    parseNodeValue: true, // 解析节点值
    trimValues: true, // 去除值的空格
    parseAttributeValue: true, // 解析属性值
  };

  // 创建 XML 解析器实例
  const parser = new XMLParser(options);

  // 解析 XML 字符串
  const result = parser.parse(xml);
  // 获取 string 元素的内容
  let resultString = result.string['#text'];
  return resultString;
  // return result.string['#text'];
};
