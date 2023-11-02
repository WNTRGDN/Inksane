export interface IWebsite {
    id: number;
    key: string;
    name: string;
    routes: IRoute[];
    menus: IMenu[];
    settings: ISettings;
    socials: ISocials;
    form: IForm;
    createDate: Date;
    updateDate: Date;
}

export interface ISocials {
    facebook: string;
    instagram: string;
    twitter: string
}

export interface IRoute {
    [key:string]: number;
}

export interface IParams {
    slug: string[];
}

export interface IPage {
    id: number;
    key: string;
    level: number;
    name: string;
    url: string;
    blocks: IBlock[];
    metaData: IMetaData;
    createDate: string;
    updateDate: string;
}

export interface IMetaData {
    title: string;
    keywords: string[];
    description: string;
    image: string;
}

export interface ISettings {
    address: string;
    email: string;
    logo: string;
    phone: string;
    openingHours: IOpeningHours[];
}

export interface IMenu {
    title: string;
    links: ILink[];
    includeHome: boolean;
    alias: string;
    exists: boolean;
    order: number;
}

export interface ICrops {
    Hero: string,
    Thumbnail: string,
    Banner: string
}

export interface ILink {
    title: string;
    url: string;
}

export interface IOpeningHours {
    day: string;
    opening: Date;
    closing: Date;
    order: number;
}

export interface IBlock {
    type: string;
    alias: string;
    order: number;
}

export interface IHeader {
    settings: ISettings;
    menus: IMenu[];
}

export interface IFooter {
    settings: ISettings;
    menus: IMenu[];
    name: string;
    socials: ISocials;
    form: IForm;
}

// form

export interface IForm {
    id: string,
    name: string,
    fields: IField[],
    messageOnSubmit: string,
    nextLabel: string,
    prevLabel: string,
    submitLabel: string,
    fieldTypes: Record<string, string>
}

export interface IField {
    alias: string,
    allowMultipleFileUploads: boolean,
    allowedUploadTypes: object,
    caption: string,
    containsSensitiveData: boolean,
    cssClass: string,
    fieldTypeId: string,
    fieldType: string,
    id: string,
    invalidErrorMessage: string,
    mandatory: boolean,
    placeholder: string,
    regEx: string,
    requiredErrorMessage: string,
    settings: IFormFieldSettings,
    submitting: boolean
}

export interface IFormFieldSettings {
    autocompleteAttribute: string,
    defaultValue: string,
    fieldType: string,
    maximumLength: string,
    numberOfRows: number,
    placeholder: string,
    showLabel: string
}

// commerce

export interface IProduct {
    id: string,
    object: string,
    active: boolean,
    created: Date,
    defaultPriceId: string,
    defaultPrice: IPrice,
    description: string,
    images: string[],
    name: string,
    taxCodeId: string,
    details: string,
    updated: Date,
    type: string,
    alias: string,
    order: number
}

export interface IPrice {
    id: string,
    object: string,
    active: boolean,
    billingScheme: string,
    created: Date,
    currency: string,
    productId: string,
    recurring: IRecurring,
    taxBehavior: string,
    type: string,
    unitAmount: number,
    unitAmountDecimal: number,
}

export interface IRecurring {
    interval: string,
    intervalCount: number,
    trialPeriodDays: number,
    usageType: string,
}

export interface ISessionLineItem {
    product: string;
    price: string;
    quantity: number;
    recurring: boolean;
}