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
  AxiesId: any;
  setAxiesId: (AxiesId: any) => void;
  setVoucherUserHistory: (VoucherUserHistory: any) => void;
  setVoucherData: (voucherData: any) => void;
  surveyData: any;
  setSurveyData: (surveyData: any) => void;
  idVoucher: string;
  setIdVoucher: (idVoucher: string) => void;
  idSchedulePurchase: string;
  setIdSchedulePurchase: (idSchedulePurchase: string) => void;
  idSchedule: string;
  setIdSchedule: (idSchedule: string) => void;
  Idconfirmation: boolean;
  setIdConfirmation: (confirmation: boolean) => void;
  Idcancel: boolean;
  setIdCancel: (cancel: boolean) => void;
  refresh: boolean;
  setRefresh: (refresh: boolean) => void;
}

const useDataStorage = create(
  persist<DataStore>(
    (set) => ({
      AxiesId: [
        {
          Items: [{}],
        },
      ],
      setAxiesId: (AxiesId) => set({ AxiesId }),
      idSchedulePurchase: "",
      setIdSchedulePurchase: (idSchedulePurchase) =>
        set({ idSchedulePurchase }),
      Idconfirmation: false,
      setIdConfirmation: (confirmation) =>
        set({ Idconfirmation: confirmation }),
      Idcancel: false,
      setIdCancel: (cancel) => set({ Idcancel: cancel }),
      refresh: false,
      setRefresh: (refresh) => set({ refresh }),
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
