import { type FormItemRule } from 'element-plus';
declare const _default: import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToOption<{
    options: DesignDataOptions;
    label?: string | undefined;
    formItemProp?: string[] | undefined;
    formItemRules?: FormItemRule[] | undefined;
}>, {
    label: string;
    formItemProp: () => string[];
}>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    change: (val: string | number | boolean) => void;
}, string, import("vue").PublicProps, Readonly<globalThis.ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToOption<{
    options: DesignDataOptions;
    label?: string | undefined;
    formItemProp?: string[] | undefined;
    formItemRules?: FormItemRule[] | undefined;
}>, {
    label: string;
    formItemProp: () => string[];
}>>> & {
    onChange?: ((val: string | number | boolean) => any) | undefined;
}, {
    label: string;
    formItemProp: string[];
}, {}>;
export default _default;
type __VLS_WithDefaults<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? __VLS_Prettify<P[K] & {
        default: D[K];
    }> : P[K];
};
type __VLS_Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToOption<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
