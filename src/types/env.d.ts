/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string | undefined
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
