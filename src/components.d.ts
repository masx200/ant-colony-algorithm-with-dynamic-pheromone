declare module "vue" {
    export interface GlobalComponents {
        ElInputNumber: typeof import("element-plus/es")["ElInputNumber"];
        ElProgress: typeof import("element-plus/es")["ElProgress"];
        ElRadio: typeof import("element-plus/es")["ElRadio"];
        ElRadioGroup: typeof import("element-plus/es")["ElRadioGroup"];
    }
}

export {};
