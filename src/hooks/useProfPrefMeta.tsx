import React, { createContext, ReactNode, useContext } from "react";

export interface ProfPrefMetaContextType {
    profType: string;
    isDisabled: boolean;
}

const ProfPrefMetaContext = createContext<ProfPrefMetaContextType>(
    {} as ProfPrefMetaContextType
);

// quick and dirty
export function ProfPrefMetaProvider({
    children,
    value,
}: {
    children: ReactNode;
    value: ProfPrefMetaContextType;
}): JSX.Element {
    return (
        <ProfPrefMetaContext.Provider value={value}>
            {children}
        </ProfPrefMetaContext.Provider>
    );
}

export default function useProfPrefMeta(): ProfPrefMetaContextType {
    return useContext(ProfPrefMetaContext);
}
