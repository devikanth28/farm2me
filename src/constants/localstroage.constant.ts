interface LocalStorageConstant {
    accessToken: string,
    refreshToken: string,
    user: string,
    userAddresses: string,
    rememberedCredentials: string
}

const LocalStorageConstant: LocalStorageConstant = {
    accessToken: "access-token",
    refreshToken: "refresh-token",
    user: "user",
    userAddresses:"user-addresses",
    rememberedCredentials: "rememberedCredentials"
};

export default LocalStorageConstant;