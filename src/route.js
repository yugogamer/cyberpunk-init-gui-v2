import Home from './routes/Home.svelte'
import Groupes from './routes/Groupes.svelte'
import Groupe from './routes/Groupe.svelte'

export const routes = {
    '/': Home,
    '/groupes': Groupes,
    '/groupe/:id': Groupe,
}