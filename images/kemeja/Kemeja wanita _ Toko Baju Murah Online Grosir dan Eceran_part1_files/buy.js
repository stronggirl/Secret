function std(arr){
	var sum = 0;
	var devnsum = 0;
	var stddevn = 0;
	var len = 0;
	var dev = 0;
	for (var k in arr) {
		sum = sum + arr[k];
		len++;
	}
	var mean = (sum / len).toFixed(2);
	for (var key in arr) {
		dev = arr[key] - mean;
		dev = dev * dev;
		devnsum += dev;
	}
	stddevn = Math.sqrt(devnsum / (len - 1)).toFixed(2);
	return stddevn;
}

function valid(){
	var item = 0, total_qty = 0, maks = 0, mins = 100, vars = [], orders = [];
	$('input[type=hidden][name^=qty], select[name^=qty]').each(function(i, el){
		qty = parseInt($(this).val());
		vars[i] = qty;
		if (qty > 0)
		{
			item++;
			total_qty += qty;
			orders[i] = qty;
		}
		if (mins > qty) mins = qty;
		if (maks < qty) maks = qty;
	});
	if (total_qty == 0)
	{
		alert('Jumlah produk yang dibeli tidak boleh kosong.');
		return;
	}
	else
	{
		if (total_qty > max_beli)
		{
			alert('Maksimal pembelian adalah '+max_beli+' potong.');
			return;
		}
		
		if (item == total_qty) return true;
		if (total_qty < min_grosir) return true;
		//if (total_var > item && total_qty > item) return false;
		if ( (maks-mins) < 2) return true;
		
		var stda = std(vars);
		var arra = vars;
		for (k in orders) arra[k] = arra[k] - orders[k];
		var stdb = std(arra);
		if (stdb <= stda) return true;
		
		return false;
	}
}
