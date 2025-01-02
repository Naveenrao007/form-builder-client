export const groupDirectoriesByOwner = (directories) => {
    console.log("directories", directories);

    return directories?.reduce((result, dir) => {
        const userId = dir.owner.id;

        if (!result[userId]) {
            result[userId] = [];
        }

        result[userId].push(dir);

        return result;
    }, {});
};
