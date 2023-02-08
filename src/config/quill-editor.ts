import MagicUrl from "quill-magic-url";
import Quill from "quill";
Quill.register("modules/magicUrl", MagicUrl);

const bindings = {
    custom: {
        key: "Enter",
        ctrlKey: true,
        handler: function () {
            const element = document.getElementsByClassName("quill-button")[0];
            if (element instanceof HTMLElement) {
                element.click();
            }
        },
    },
};
export const quillModules = {
    toolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link"],
    ],
    magicUrl: true,
    keyboard: {
        bindings,
    },
};
