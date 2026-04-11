let dbReady = false;

export const setDbReady = (value: boolean) => {
    dbReady = value;
};

export const getDbReady = () => dbReady;