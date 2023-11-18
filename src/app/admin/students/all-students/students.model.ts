import { formatDate } from '@angular/common';
export class Students {
  id: number;
  username: string;
  api_key: string;
  client_id: string;
  role_id: number;
  country_code: number;
  mobile: string;
  email: string;
  password: string;
  validation_token: string;
  referral_code: string;
  product_id: number;
  total_invitees: number;
  successfull_referral: number;
  is_active: number;
  constructor(students: Students) {
    {
      this.id = students.id;
      this.username = students.username || '';
      this.api_key = students.api_key || '';
      this.client_id = students.client_id || '';
      this.role_id = students.role_id || 0;
      this.country_code = students.country_code || 0;
      this.mobile = students.mobile || '';
      this.email = students.email || '';
      this.password = students.password || '';
      this.validation_token = students.validation_token || '';
      this.referral_code = students.referral_code || '';
      this.product_id = students.product_id || 0;
      this.total_invitees = students.total_invitees || 0;
      this.successfull_referral = students.successfull_referral || 0;
      this.is_active = students.is_active || 1;
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
