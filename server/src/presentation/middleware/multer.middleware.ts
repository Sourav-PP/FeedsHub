import multer from 'multer';

const memoryStorage = multer.memoryStorage();

export const uploadFields = (fields: string[]) => {
    return multer({ storage: memoryStorage }).fields(fields.map(name => ({ name, maxCount: 1 })));
};
console.log('in multer')

export const uploadSingle = multer({ storage: memoryStorage }).single('file');
