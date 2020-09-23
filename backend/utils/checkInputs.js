module.exports = {
	validName : function (value){
		const regexName = /^[a-zA-Zàáâãäåçèéêëìíîïðòóôõöùúûüýÿ ,.'-]/
		return regexName.test(value);
	},
	validEmail : function (value){
		const regexEmail = /^[a-z0-9!#$ %& '*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&' * +/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/g;
		return regexEmail.test(value);
	}
}