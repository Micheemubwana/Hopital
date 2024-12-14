export const generationDeMotDePasse = ()=>{
    const nombre =[1, 2, 3, 4, 5, 6, 7, 8, 9];
    let motDePass: string;
    for (let index= 0; index<8; index++){
        const indice = Math.floor(Math.random() *9);
        motDePass += indice ;
    }
    return motDePass;
}