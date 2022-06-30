import { ethers } from "hardhat";
import { expect } from "chai";
import { Test } from "../typechain";
import { BigNumber } from "ethers";

describe("EncryptDecrypt", () => {
  let testContract: any;
  before(async () => {
    const TestFactory = await ethers.getContractFactory('Test');
    testContract = await TestFactory.deploy();
    await testContract.deployed();
  })
  it("testing encryptDecrypt", async () => {
    const data = 'hello world'; // actual length = 22 less than 32 bytes, only 1 loop => i = 0
    const bytesUri = ethers.utils.toUtf8Bytes(data);
    const key = ethers.utils.toUtf8Bytes('mykey');

    console.log('\n-------Solidity Debug--------');
    const encryptedBaseUri = await testContract.encryptDecrypt(
      bytesUri,
      key,
    );
    console.log('Res:\t', encryptedBaseUri);

    console.log('\n------- JS Debug--------');
    console.log('Data:\t', ethers.utils.formatBytes32String(data))
    console.log('Key:\t', ethers.utils.formatBytes32String('mykey'))
    // bytes32 hash = keccak256(abi.encodePacked(key, i));
    const hash = ethers.utils.keccak256(ethers.utils.solidityPack(["bytes", "uint256"], [key, 0]));
    console.log('Hash:\t', hash);
    // chunk := mload(add(data, add(i, 32)))
    // chunk ^= hash;
    const chunk = BigNumber.from(hash).xor(BigNumber.from(ethers.utils.formatBytes32String(data)));
    console.log('Chunk:\t', chunk.toHexString());
    const manualRes = chunk.toHexString().substring(0, 2 + data.length * 2); // 'A' => 0xFF // ASCII code
    // 2 + data.length * 2
    // 0x   
    console.log('Res:\t', manualRes);

    expect(encryptedBaseUri.toString()).to.be.eq(manualRes);
  })
})
