
import { ChangeEvent, FormEvent, useState } from "react"
import { currencies } from "../data"
import { useCryptoStore } from "../store"
import { Pair } from "../types"
import { ErrorMessage } from "./ErrorMessage"


export const CriptoSearchForm = () => {

    const cryptocurrencies = useCryptoStore((state) => state.cryptocurrencies)
    const fetchData = useCryptoStore((state) => state.fetchData)
    
    const [pair, setPair] = useState<Pair>({
        currency: '',
        cryptocurrency: ''
    })
    const [error, setError] = useState('')

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setPair({
            ...pair,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // Validar
        if(Object.values(pair).includes('')) {
            setError('Todos los campos son obligatorios')
            return
        }
        setError('')
        // Pasar al componente principal
        fetchData(pair)

    }


    return (
        <form
            onSubmit={handleSubmit}
            className="form"
        >
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <div className="field">
                <label htmlFor="cripto">Elige tu criptomoneda</label>
                <select 
                name="currency" 
                id="currency"
                onChange={ handleChange}
                value={pair.currency}
                >
                    <option value="">- Elige una criptomoneda -</option>
                    {currencies.map(currency => (
                        <option key={currency.code} value={currency.code}>{currency.name}</option>
                    ))}
                </select>
            </div>

            <div className="field">
                <label htmlFor="cripto">Elige tu moneda</label>
                <select 
                name="cryptocurrency" 
                id="cryptocurrency"
                onChange={ handleChange}
                value={pair.cryptocurrency}
                >
                    <option value="">- Elige una moneda -</option>
                    {cryptocurrencies.map(crypto => (
                        <option
                            key={crypto.CoinInfo.Name}
                            value={crypto.CoinInfo.Name}>
                            {crypto.CoinInfo.FullName}
                        </option>
                    ))}
                </select>
            </div>

            <input type="submit" value='Cotizar' />
        </form>
    )
}
