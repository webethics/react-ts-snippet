type Placement = "top" | "right" | "bottom" | "left";
export interface simpleTooltipConfig {
    content?: string;
    tabIndex?: number;
    icon?: string | any;
    placement?: Placement | undefined;
    active?: boolean;
    isLogoutLink: boolean;
    to?: string;
}
