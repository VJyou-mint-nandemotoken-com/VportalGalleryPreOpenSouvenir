
//--------------general settings--------------

//matic testnet
//const ContractAddress = "0x0C00b7b3fe05Ac0cC9eD6E3593865429dA136675";

//mainnet
const ContractAddress = "0xF0cba130DeBF24Fc2e2423a890d4Cfc2a4cc6f52";

//matic matic testnet(0) or matic network(1)
const network = 1;

//---------------------------------------------


//testnet or mainnet 
//rpclist = [ "" , "" ];
explorerlist = [ "https://explorer-mumbai.maticvigil.com/tokens/" , "https://explorer-mainnet.maticvigil.com/tokens/" ];
mintnandemotokenapilist = [ "https://mint.nandemotoken.com/api/v1/testnet/" , "https://mint.nandemotoken.com/api/v1/" ];
opensealist = [ "https://testnets.opensea.io/account/" , "https://opensea.io/account/"];


let replica_contract;

window.onload = async function() {
    ethereum.on('chainChanged', (_chainId) => window.location.reload());
}

function walletmodal(){
    $('#wallet-popup').modal('show');
}


async function loadmm_gasfree(){
    $('#wallet-popup').modal('hide');
    if (typeof web3 == 'undefined'){
        ans = window.confirm("please install metamask\n：https://metamask.io/download");
        if (ans){
            window.open("https://metamask.io/download");
        }
        return;
    }
    
    ans = window.confirm("Memorial NFT will be sent to your address")
    if ( !ans ){
        return;
    }
    
    
    await window.ethereum.enable();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const add = await signer.getAddress();

    ans2 = await signer.signMessage( "get NFT" );
    if ( ans2[1] != "x" ){
        return;
    }
    
    
    
    let result = await $.getJSON( mintnandemotokenapilist[network] + ContractAddress + "/"+ add + "/" )
    console.log(result);
    $('#myinfo').modal('show')
    
    //    window.alert("開発中です。しばらくお待ちください");
}

function explorer(){
    //window.alert("matic")
    ans = window.confirm("Open Blockchain Explorer\n\n" + explorerlist[network] + ContractAddress + "/inventory\n\nDo you want to check the issuance status of NFT? (Usually issued within 1 minute)");
        if(ans){ window.open( explorerlist[network] +ContractAddress + "/inventory"); }
}

function opensea(){
    //window.alert("opensea")
    ans = window.confirm("Check NFT in OpenSea\n\n"+ opensealist[network] + "\n\nDo you want to open OpenSea?\n(It will take a few minutes to reflect. The NFT image will be displayed after processing)");
        if(ans){ window.open( opensealist[network] ); }
}
