import Input from "@/components/input/Input";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  MdCalendarMonth,
  MdOutlineLock,
  MdOutlineMail,
  MdOutlinePerson,
} from "react-icons/md";
import { AiOutlinePhone } from "react-icons/ai";
import Checkbox from "@mui/material/Checkbox";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import Button from "@/components/button/Button";
import { FaRegAddressCard } from "react-icons/fa";
import CardExpanded from "@/components/card/CardExpanded";
import { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import { ToastContainer, toast } from "react-toastify";
import { registerUser } from "@/services/login";
import { registerAdm } from "@/services/login";
import dayjs from "dayjs";
import Modal from "@/components/modals/Modal";
import { Value } from "sass";

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [showValidationMessage, setShowValidationMessage] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [isSecondCheckboxChecked, setIsSecondCheckboxChecked] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const [registerAccount, setRegisterAccount] = useState({
    User: {
      Email: "",
      Password: "",
    },
    name: "",
    confirmedPassword: "",
    birthdate: "",
    mobilephone: "",
    cpf: "",
    programCode: "073",
    isAdmin: false,
  });

  const [registerAccountAdmin, setRegisterAccountAdmin] = useState({
    emailAddress: "",
    mobilephone: "",
    userName: "",
    password: "",
    isAdmin: true,
    birthDate: "",
    cpf: "",
    programCode: "073",
  });

  const handleSignup = () => {
    setLoading(true);
    if (registerAccount.isAdmin) {
      registerAdm(registerAccountAdmin)
        .then(() => {
          toast.success("Cadastro administrador realizado com sucesso");
          localStorage.setItem("mobilephone", registerAccount.mobilephone);
          router.push("/confirmation");
        })
        .catch((err) => {
          toast.error("Erro ao realizar cadastro");
          setLoading(false);
        });
    } else {
      registerUser(registerAccount)
        .then(() => {
          toast.success("Cadastro realizado com sucesso");
          localStorage.setItem("mobilephone", registerAccount.mobilephone);
          router.push("/confirmation");
        })
        .catch((err) => {
          toast.error("Erro ao realizar cadastro");
          setLoading(false);
        });
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    if (name === "Email") {
      const isAdmin = value.includes("@its.jnj.com");
      setRegisterAccount((prevState) => ({
        ...prevState,
        isAdmin: isAdmin,
        User: { ...prevState.User, Email: value },
      }));
      setRegisterAccountAdmin((prevState) => ({
        ...prevState,
        emailAddress: value,
        userName: value,
      }));
    } else if (name === "Password") {
      setRegisterAccount((prevState) => ({
        ...prevState,
        User: { ...prevState.User, Password: value },
      }));
      setRegisterAccountAdmin((prevState) => ({
        ...prevState,
        password: value,
      }));
    } else if (name === "birthdate") {
      setRegisterAccount((prevState) => ({
        ...prevState,
        birthdate: value,
      }));
      setRegisterAccountAdmin((prevState) => ({
        ...prevState,
        birthDate: value,
      }));
    } else if (name === "name") {
      const validatedValue = validateName(value);
      setInputValue(validatedValue);
      setRegisterAccount((prevState) => ({
        ...prevState,
        name: validatedValue,
      }));
      setRegisterAccountAdmin((prevState) => ({
        ...prevState,
        name: validatedValue,
      }));
    } else {
      setRegisterAccount((prevState) => ({ ...prevState, [name]: value }));
      setRegisterAccountAdmin((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const validateName = (inputValue: string) => {
    const filteredValue = inputValue.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, "");
    const truncatedValue = filteredValue.slice(0, 50);
    return truncatedValue;
  };

  const checkIsUnderage = (birthdateString: string) => {
    const birthdate = dayjs(birthdateString);
    const today = dayjs();
    const age = today.diff(birthdate, "year");
    return age >= 18;
  };

  const formatDate = () => {
    const birthdate = registerAccount.birthdate;
    const birthdateArray = birthdate.split("/");
    const birthdateDay = birthdateArray[0];
    const birthdateMonth = birthdateArray[1];
    const birthdateYear = birthdateArray[2];

    if (parseInt(birthdateMonth, 10) > 12) {
      return toast.error("Data de nascimento inválida");
    }

    const birthdateFormatted = `${birthdateYear}-${birthdateMonth}-${birthdateDay}`;
    console.log(birthdateFormatted);
    setRegisterAccount((prevState) => ({
      ...prevState,
      birthdate: birthdateFormatted,
    }));
    setRegisterAccountAdmin((prevState) => ({
      ...prevState,
      birthDate: birthdateFormatted,
    }));

    if (!checkIsUnderage(birthdateFormatted)) {
      return toast.error(
        "Você precisa ter mais de 18 anos para prosseguir com o cadastro."
      );
    }
  };

  const CompletedIsCpf = (cpf: string) => {
    const cpfNumbers = cpf.replace(/[^\d]/g, "");
    return cpfNumbers.length === 11;
  };

  const isValidMobilephone = (mobilephone: string) => {
    const cleanedMobilephone = mobilephone.replace(/\D/g, "");

    if (cleanedMobilephone.length !== 11) {
      return false;
    }
    if (cleanedMobilephone[2] !== "9") {
      return false;
    }
    if (/^(\d)\1+$/.test(cleanedMobilephone)) {
      return false;
    }
    return true;
  };

  const completedForm = () => {
    const { User } = registerAccount;
    const { Email, Password } = User;
    const { name, birthdate, mobilephone, cpf, confirmedPassword } =
      registerAccount;
    return (
      name !== "" &&
      showValidationMessage === false &&
      checkIsUnderage(birthdate) &&
      isValidMobilephone(mobilephone) &&
      cpf !== "" &&
      passwordError === "" &&
      isSecondCheckboxChecked
    );
  };

  const handleCheckboxChange = (e: any) => {
    setIsCheckboxChecked(e.target.checked);
  };

  const handleSecondCheckbox = (e: any) => {
    setIsSecondCheckboxChecked(e.target.checked);
  };

  const handleEmailChange = (e: any) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    setIsValidEmail(inputEmail.includes("@") && inputEmail.includes("."));
  };

  useEffect(() => {
    if (email === "") {
      setShowValidationMessage(false);
    } else {
      setShowValidationMessage(!isValidEmail);
    }
  }, [email, isValidEmail]);

  const maskedPhoneNumber = () => {
    return (
      <InputMask
        mask="(99) 99999-9999"
        alwaysShowMask={false}
        maskPlaceholder={null}
        name="mobilephone"
        onChange={handleChange}
        disabled={loading}
      >
        <Input
          placeholder="Telefone"
          startIcon
          iconClass="scale-x-[-1]"
          iconStart={AiOutlinePhone}
        />
      </InputMask>
    );
  };

  const maskedCpf = () => {
    return (
      <InputMask
        name="cpf"
        mask="999.999.999-99"
        alwaysShowMask
        maskPlaceholder={null}
        onChange={handleChange}
        disabled={loading}
      >
        <Input
          disabled={loading}
          placeholder="CPF"
          startIcon
          iconStart={FaRegAddressCard}
        />
      </InputMask>
    );
  };

  const maskedBirthDate = () => {
    return (
      <InputMask
        name="birthdate"
        mask="99/99/9999"
        alwaysShowMask
        maskPlaceholder={null}
        onChange={handleChange}
        onBlur={formatDate}
        disabled={loading}
      >
        <Input
          placeholder="Data de nascimento"
          startIcon
          iconStart={MdCalendarMonth}
        />
      </InputMask>
    );
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAcceptTerm = () => {
    handleCloseModal();
  };

  const validatePassword = () => {
    const User = registerAccount.User;
    const { Password } = User;
    const { confirmedPassword } = registerAccount;

    if (Password !== confirmedPassword) {
      setPasswordError("As senhas não coincidem.");
      return false;
    }

    if (Password.length < 8) {
      setPasswordError("A senha deve conter no mínimo 8 caracteres.");
      return false;
    }

    if (!/[A-Z]/.test(User.Password)) {
      setPasswordError("A senha deve conter pelo menos uma letra maiúscula.");
      return false;
    }

    if (!/[0-9]/.test(User.Password)) {
      setPasswordError("A senha deve conter pelo menos um número.");
      return false;
    }

    if (!/[\W_]/.test(User.Password)) {
      setPasswordError("A senha deve conter pelo menos um caractere especial.");
      return false;
    }

    setPasswordError("");
    return true;
  };

  return (
    <div className="h-[135vh] md:h-screen bg-careLightBlue ">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
      />

      <div className="hidden xl:block">
        <div className="fixed z-40 w-60 h-[7%] right-0 bottom-[40%] bg-[#FFB81C]"></div>
        <div className="fixed z-40 w-60 h-[7%] right-0 bottom-[30%] bg-[#A51890]"></div>
        <div className="fixed z-40 w-60 h-[7%] right-0 bottom-[20%] bg-[#FF6A39]"></div>
      </div>
      <Image
        src="/acuvue-letter.png"
        className="block md:hidden absolute top-10 left-12"
        alt="acuvue letter"
        width={120}
        height={50}
      />
      <div className="block md:hidden">
        <Image
          width={400}
          height={1000}
          alt="background-mobile"
          src="/bg-login-orange-mobile.png"
          className="z-40 absolute top-[100px]"
          quality={100}
        />
      </div>
      <div className="hidden xl:block">
        <Image
          fill
          alt="background"
          src="/bg-login-desktop.png"
          className="object-top object-cover"
          quality={100}
        />
      </div>
      <CardExpanded>
        <div className="xl:flex xl:flex-col text-careLightBlue">
          <span className="md:text-4xl mr-1 text-2xl">
            Falta pouco para acessar seu Programa
          </span>
          <span className="md:text-4xl text-2xl">
            de Benefícios <strong>My</strong>ACUVUE®
          </span>
        </div>
        <div className="my-6">
          <span className="text-careBlue text-sm opacity-70 xl:text-lg 2xl:text-xl">
            Preencha os campos abaixo:
          </span>
        </div>
        <div className="fill-careBlue w-full">
          <Input
            name="name"
            fullWidth
            placeholder="Nome"
            startIcon
            iconStart={MdOutlinePerson}
            onChange={handleChange}
            disabled={loading}
            maxLength={50}
            value={inputValue}
          />
          <div className="md:grid md:grid-cols-2 gap-8 my-2">
            <div className="md:col-col-2">
              <Input
                name="Email"
                placeholder="Email"
                required
                startIcon
                maxLength={100}
                iconStart={MdOutlineMail}
                disabled={loading}
                onChange={(e) => {
                  handleEmailChange(e);
                  handleChange(e);
                }}
              />
              {showValidationMessage && (
                <div className="mt-2">
                  <span className="text-red-500">Email inválido</span>
                </div>
              )}
            </div>
            {maskedBirthDate()}
          </div>
          <div className="md:grid md:grid-cols-2 gap-8 my-2">
            {maskedPhoneNumber()}
            {maskedCpf()}
          </div>
          <div className="md:grid md:grid-cols-2 gap-8 my-2 fill-careBlue">
            <Input
              name="Password"
              placeholder="Senha"
              startIcon
              iconStart={MdOutlineLock}
              endIcon
              maxLength={20}
              type="password"
              onChange={handleChange}
              disabled={loading}
              onBlur={validatePassword}
            />
            <Input
              name="confirmedPassword"
              placeholder="Confirmar senha"
              startIcon
              iconStart={MdOutlineLock}
              endIcon
              maxLength={20}
              type="password"
              onChange={handleChange}
              disabled={loading}
              onBlur={validatePassword}
            />
            {passwordError && (
              <span className="text-red-500 ">{passwordError}</span>
            )}
          </div>
        </div>
        <div className="md:grid md:grid-cols-1 xl:grid-cols-2 gap-8 xl:mt-5 2xl:mt-20">
          <div className="md:flex md:flex-col text-careBlue">
            <div>
              <Checkbox
                sx={{
                  color: "#03014C",
                  "&.Mui-checked": {
                    color: "#753BBD",
                  },
                }}
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<RadioButtonCheckedIcon />}
                checked={isCheckboxChecked}
                onChange={handleCheckboxChange}
              />
              <span className="md:text-md text-sm font-semibold">
                Li e aceito o
                <span className="text-careLightBlue underline cursor-pointer hover:opacity-60 ml-1">
                  Regulamento do Programa
                </span>
              </span>
            </div>
            <div>
              <Checkbox
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<RadioButtonCheckedIcon />}
                checked={isSecondCheckboxChecked}
                onChange={handleSecondCheckbox}
                sx={{
                  color: "#03014C",
                  "&.Mui-checked": {
                    color: "#753BBD",
                  },
                }}
              />
              <span className="md:text-md text-sm font-semibold">
                Li e aceito a
                <span
                  onClick={handleOpenModal}
                  className="text-careLightBlue underline hover:opacity-60 cursor-pointer ml-1"
                >
                  Política de Privacidade
                </span>
              </span>
            </div>
          </div>
          <Button
            customClass="bg-careLightBlue border-careLightBlue py-2 w-full"
            label="Finalizar cadastro"
            onClick={handleSignup}
            isLoading={loading}
            disabled={
              loading ||
              !completedForm() ||
              !CompletedIsCpf(registerAccount.cpf)
            }
          />
        </div>
      </CardExpanded>
      <div>
        {showModal && (
          <Modal
            customClass="w-[60%] h-[80%]"
            isOpen={showModal}
            onClose={handleCloseModal}
            isButtonDisabled={true}
            isCloseIconVisible={false}
          >
            <div className="flex items-center justify-center h-full">
              <div className="w-full h-[63vh]">
                <iframe
                  src="politica-privacidade.pdf"
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <button className="bg-careBlue hover:opacity-70 text-white font-bold py-2 px-4 rounded w-48 ">
                Recusar
              </button>
              <button
                onClick={handleAcceptTerm}
                className="bg-careLightBlue hover:opacity-70 text-white font-bold py-2 px-4 rounded w-48 "
              >
                Aceitar
              </button>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
}
