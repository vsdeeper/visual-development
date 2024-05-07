declare const useGlobal: import("pinia").StoreDefinition<"global", import("pinia")._UnwrapAll<Pick<{
    designData: globalThis.Ref<any[]>;
    setDesignData: (data: ActiveDesignData) => void;
    activeDesignData: globalThis.Ref<any>;
    setActiveDesignData: (data?: any) => void;
    dialogFullscreen: globalThis.Ref<boolean | undefined>;
    setDialogFullscreen: (data: boolean) => void;
}, "designData" | "activeDesignData" | "dialogFullscreen">>, Pick<{
    designData: globalThis.Ref<any[]>;
    setDesignData: (data: ActiveDesignData) => void;
    activeDesignData: globalThis.Ref<any>;
    setActiveDesignData: (data?: any) => void;
    dialogFullscreen: globalThis.Ref<boolean | undefined>;
    setDialogFullscreen: (data: boolean) => void;
}, never>, Pick<{
    designData: globalThis.Ref<any[]>;
    setDesignData: (data: ActiveDesignData) => void;
    activeDesignData: globalThis.Ref<any>;
    setActiveDesignData: (data?: any) => void;
    dialogFullscreen: globalThis.Ref<boolean | undefined>;
    setDialogFullscreen: (data: boolean) => void;
}, "setActiveDesignData" | "setDialogFullscreen" | "setDesignData">>;
export { useGlobal };
