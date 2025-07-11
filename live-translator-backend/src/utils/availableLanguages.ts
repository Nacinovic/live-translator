import { languages as tLangugages } from 'countries-list'

const languages = Object.values(tLangugages).map(elem => elem.name)

export default languages
