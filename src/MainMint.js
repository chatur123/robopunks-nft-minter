/*
The MainMint component enables the user to choose how many NFTs they want to mint, and then make the mint request. 
In case the user has not connected their Metamask wallet, this component displays a message requesting the user to do so. 
*/

import { useState } from 'react';
import { ethers, BigNumber } from 'ethers';
import roboPunksNFT from './RoboPunksNFT.json';
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";

const roboPunksNFTAddress = "0x8A1BC88F7cA507cd97Da0f6693b6dE798C601B1a";

const MainMint = ({ accounts, setAccounts }) => {
    const [mintAmount, setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);

    async function handleMint() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                roboPunksNFTAddress,
                roboPunksNFT.abi,
                signer 
            );
            try {
                const response = await contract.mint(BigNumber.from(mintAmount));
                console.log('response: ', response);
            } catch(err) {
                console.log("error", err)
            }
        }
    }
    const handleDecrement = () => {
        if (mintAmount <= 1) return;
        setMintAmount(mintAmount - 1);

    }

    const handleIncrement = () => {
        if (mintAmount >= 3) return;
        setMintAmount(mintAmount + 1);
    }

    return (
        <Flex justify="center" align="center" height="100vh" paddingBottom="150px">
            <Box width="520px">
            <div>
            <Text fontSize="48px" textShadow="0 5px #000000">RoboPunks</Text>
            <Text
            fontSize="30px"
            letterSpacing="-5.5%"
            fontFamily="VT323"
            textShadow = "0 2px 2px #000000"
            >
                It's 2078, can the RoboPunksNFT save humans? Mint RoboPunks to find out
            </Text>
            </div>
            {isConnected ? (
                <div>
                    <Flex align = "center" justify="center"> 
                        <Button 
                            backgroundColor = "#D6517D"
                            borderRadius = "5px"
                            boxShadow= "0px 2px 2px 1px #0F0F0F"
                            color = "white"
                            cursor = "pointer"
                            fontFamily = "inherit"
                            padding = "15px"
                            marginTop = "10px"
                            onClick={handleDecrement}>
                                -</Button>
                        <Input
                            readOnly
                            fontFamily = "inherit"
                            width = "100px"
                            height = "40px"
                            textAlign = "center"
                            paddingLeft = "19px"
                            marginTop = "10px"
                            type = "number"
                            value = {mintAmount}
                        />
                        <Button 
                            backgroundColor = "#D6517D"
                            borderRadius = "5px"
                            boxShadow= "0px 2px 2px 1px #0F0F0F"
                            color = "white"
                            cursor = "pointer"
                            fontFamily = "inherit"
                            padding = "15px"
                            marginTop = "10px"
                            onClick={handleIncrement}>+</Button>
                    </Flex>
                    <Button 
                        backgroundColor = "#D6517D"
                        borderRadius = "5px"
                        boxShadow= "0px 2px 2px 1px #0F0F0F"
                        color = "white"
                        cursor = "pointer"
                        fontFamily = "inherit"
                        padding = "15px"
                        marginTop = "10px"
                        onClick={handleMint}>Mint Now</Button>
                </div>
            ) : (
                <p>You are not connected</p>
            )}
            </Box>
        </Flex>
    )
}

export default MainMint;