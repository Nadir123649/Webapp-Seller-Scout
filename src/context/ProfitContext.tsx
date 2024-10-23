import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface ProfitContextValue {
  profit: number;
  setProfit: Dispatch<SetStateAction<number>>;
  salePrice: number;
  setSalePrice: Dispatch<SetStateAction<number>>;
}

export const ProfitContext = createContext<ProfitContextValue | undefined>(
  undefined
);

interface ProfitStateProps {
  children: ReactNode;
}

const ProfitState: React.FC<ProfitStateProps> = (props) => {
  const [profit, setProfit] = useState(0);
  const [salePrice, setSalePrice] = useState(0);

  //  productDetails?.quickInfo?.costPrice +
  //    calculateTotalFees(productDetails?.profitCalculator?.totalFees) +
  //    profit;
  //   (productDetails?.quickInfo?.costPrice * 25) / 100
  // );
  return (
    <ProfitContext.Provider
      value={{ profit, setProfit, salePrice, setSalePrice }}
    >
      {props.children}
    </ProfitContext.Provider>
  );
};

export default ProfitState;
