interface ILoginData {
  email: string;
  password: string;
  healthProgramCode: string;
}

interface IRegisterAccount {
  User: {
    Email: string;
    Password: string;
  };
  name: string;
  confirmedPassword: string;
  birthdate: string;
  mobilephone: string;
  cpf: string;
  programCode: string;
}

interface IChangePasswordData {
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  programCode: string;
}

interface IResetPasswordData {
  email: string;
  code: string;
}

interface IConfirmationRegisterSmsToken {
  name: string;
  token: string;
  mobilePhone: string;
  programCode: string;
}

interface IDateClient {
  data: [
    {
      namePatient: string;
      patientBirthDate: string;
      cpf: string;
      patientMobilephone: string;
      patientEmail: string;
      patientUserPassword: string;
    }
  ];
}

interface IDateAdm {
  userName: string;
  userEmail: string;
  userBirthdate: string;
  userMobilephone: string;
  userCPF: string;
  userPassword: string;
}

interface IEditClientData {
  User: {
    Email: string;
    Password: string;
  };
  name: string;
  confirmedPassword: string;
  birthdate: string;
  mobilephone: string;
  cpf: string;
  programCode: string;
}

interface IEditAdminData {
  userName: string;
  userEmail: string;
  userBirthdate: string;
  userMobilephone: string;
  userCPF: string;
  userPassword: string;
  programCode: string;
}

interface TableData {
  columns: any[];
  rows: any[];
}

interface IaddVoucherData {
  Name: string;
  DiscountType: string;
  DiscountValue: number;
  DeadlineInDays: number;
  Note: string;
  ProgramCode: string;
}

interface IupdateVoucherData {
  Id: string;
  Name: string;
  DiscountType: string;
  DiscountValue: number;
  DeadlineInDays: number;
  Note: string;
  ProgramCode: string;
}

interface IRegisterAdm {
  emailAddress: string;
  mobilephone: string;
  userName: string;
  password: string;
  isAdmin: boolean;
  birthDate: string;
  cpf: string;
  programCode: string;
}

interface VoucherId {
  id: string;
  programCode: string;
}

interface IRegisterPartiner {
  accountTypeStringMapFlag: string;
  name: string;
  telephone1: string;
  mobilePhone: string;
  emailAddress: string;
  emailAddress2: string;
  addressPostalCode: string;
  addressName: string;
  addressNumber: string;
  addressComplement: string;
  addressDistrict: string;
  addressCity: string;
  addressState: string;
  addressCountry: string;
  cnpj: string;
  mainContact: string;
  password: string;
  ProgramCode: string;
}

interface IUpdatePartiner {
  name: string;
  telephone1: string;
  mobilePhone: string;
  emailAddress: string;
  emailAddress2: string;
  addressPostalCode: string;
  addressName: string;
  addressNumber: string;
  addressComplement: string;
  addressDistrict: string;
  addressCity: string;
  addressState: string;
  addressCountry: string;
  cnpj: string;
  mainContact: string;
  password: string;
  ProgramCode: string;
  accountTypeStringMapFlag: string;
}

interface IPurchaseAdd {
  ProgramCode: string;
  Items: [
    {
      ProductId: string;
      Amount: number;
    }
  ];
}

interface IRepayment {
  ProgramCode: string;
  Items: [
    {
      ProductId: string;
      Amount: number;
    }
  ];
}
interface IVoucherUse {
  programCode: string;
  voucherId: string;
}
interface IRescueVoucher {
  programCode: string;
  voucherId: string;
}
