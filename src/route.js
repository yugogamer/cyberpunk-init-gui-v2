import Home from './routes/Home.svelte'
import Groupes from './routes/Groupes.svelte'
import Groupe from './routes/Groupe.svelte'
import Armor from './routes/ArmorHelper.svelte'

export const routes = {
    '/': Home,
    '/groupes': Groupes,
    '/groupe/:id': Groupe,
    '/armor': Armor,
}