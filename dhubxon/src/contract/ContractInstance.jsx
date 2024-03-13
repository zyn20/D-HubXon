import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import abi from './ContributeProjects.json';

const ContractInstance = () => {
    const [state, setState] = useState({
        provider: null,
        signer: null,
        contract: null
    });

    useEffect(() => {
        const template = async () => {
            const contractAddress = '0x8FAb12C61D5983EAc6BF72e2Ec8805d2Ff5ed2f0';
            const contractABI = abi.abi;
            
            try {
                const { ethereum } = window;
                // const account = await ethereum.request({
                //     method: 'eth_requestAccounts'
                // });

                window.ethereum.on('accountsChanged', () => {
                    window.location.reload();
                });

                const provider = new ethers.providers.Web3Provider(ethereum); // Read from the Blockchain
                const signer = provider.getSigner(); // Write to the blockchain
                
                const contract = new ethers.Contract(
                    contractAddress,
                    contractABI,
                    signer
                );
                
                setState({ provider, signer, contract });
            } catch (error) {
                console.log(error);
            }
        };

        template();
    }, []);

    return state; // Return the state variable

}

export { ContractInstance }; // Export the ContractInstance component
