export const unpackSingleDocument = entry => ({ ...entry._doc })
export const unpackMultipleDocuments = entries => entries.map(entry => ({ ...entry._doc}))