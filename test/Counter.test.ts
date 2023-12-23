import {expect} from 'chai';
import {ethers, deployments} from 'hardhat';
import {Counter} from '../typechain-types';

const setup = deployments.createFixture(async () => {
	await deployments.fixture('Counter');
	const contracts = {
		Counter: await ethers.getContract<Counter>('Counter'),
	};
	return {
		...contracts,
	};
});

describe('Counter contract', function () {
	it('Should increment the number correctly', async function () {
		const {Counter} = await setup();

		await Counter.increment();
		expect(await Counter.number()).to.equal(1);
	});

	// This is not a fuzz test because Hardhat does not support fuzzing yet.
	it('Should set the number correctly', async function () {
		const {Counter} = await setup();
		await Counter.setNumber(100);
		expect(await Counter.number()).to.equal(100);
	});
});
