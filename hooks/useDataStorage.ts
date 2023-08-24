import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface DataStore {
  id: string;
  Name: string;
  DiscountType: string;
  DiscountValue: number;
  DeadlineInDays: number;
  Note: string;
  VoucherUserHistory: any;
  setVoucherUserHistory: (VoucherUserHistory: any) => void;
  setVoucherData: (voucherData: any) => void;
  surveyData: any;
  setSurveyData: (surveyData: any) => void;
  idVoucher: string;
  setIdVoucher: (idVoucher: string) => void;
  idSchedule: string;
  setIdSchedule: (idSchedule: string) => void;
}

const useDataStorage = create(
  persist<DataStore>(
    (set) => ({
      idSchedule: "",
      setIdSchedule: (idSchedule) => set({ idSchedule }),
      idVoucher: "",
      setIdVoucher: (idVoucher) => set({ idVoucher }),
      VoucherUserHistory: [],
      setVoucherUserHistory: (VoucherUserHistory) =>
        set({ VoucherUserHistory }),
      id: "",
      Name: "",
      DiscountType: "",
      DiscountValue: 0,
      DeadlineInDays: 0,
      Note: "",
      surveyData: [],
      setSurveyData: (surveyData) => set({ surveyData }),
      setVoucherData: (voucherData) =>
        set({
          id: voucherData.id,
          Name: voucherData.Name,
          DiscountType: voucherData.DiscountType,
          DiscountValue: voucherData.DiscountValue,
          DeadlineInDays: voucherData.DeadlineInDays,
          Note: voucherData.Note,
        }),
    }),
    {
      name: "data-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useDataStorage;
