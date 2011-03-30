/*!
* JSON-Flyer JavaScript Library v0.1
* https://github.com/heroygt/JSON-Flyer
*
* Copyright 2011, Guangtao Yang
* Dual licensed under the MIT or GPL Version 2 licenses.
* You are free to use a this project in commercial projects 
* as long as the copyright header is left intact.
*
* Date: 2011-03-02
*/
function JsonFlyer(){
};

JsonFlyer.prototype = { 
	render : function(template) {
		var html = this.convertJSONToHTML(template);
		return html
	},

	assign : function(data, selector) {
		for(var key in data) {
			var value = data[key];
			var part = /^\./.test(key) ? key : "#" + key;
			var newSelector = selector == undefined ? part : selector + " " + part;				

			if (typeof(value) == 'object') {
				this.assign(value, newSelector);
			} else {
				this.setValue(newSelector, value);
			}
		}
	},

	setValue : function(selector, value) {
		var elements = $(selector);
		switch(elements.get(0).tagName) {
			case 'INPUT' : elements.val(value); elements.click();break;
			case 'TEXTAREA' : elements.val(value);break;
			case 'LABLE': elements.text(value);break;
			case 'SELECT': {
				if(new RegExp("^options =>").test(value)) {
					value = value.replace("options =>", "");
					var optionsHTML = this.initSelectOptions($.parseJSON(value));
					elements.html(optionsHTML);
					break;
				} else {
					elements.val(value);
					break;
				}
			}
			default: break;
		}
	},
	
	initSelectOptions : function(options) {
		var optionsHTML = "";
		$.each(options, function(text, value) {
			optionsHTML += '<option value="' + value + '">' + text + "</option>";
		});
		return optionsHTML;
	},

	convertJSONToHTML : function(json) {
		if (typeof(json)=='string') return json;
		var html = '';
		for (var key in json) {
			html += this.convertJSONToHTMLElement(key, json[key]);
		};
		return html;
	},

	convertJSONToHTMLElement : function(key, body) {
		if (key == 'attrs') return '';
		var params = this.convertKeyToCSSSelector(key);
		var attrs = body.attrs == null ? '' : ' ' + body.attrs;
		var element =
		'<' + params['start'] + attrs + '>' +
			this.convertJSONToHTML(body) +
		'</' + params['tag'] + '>';
		return element;
	},

	convertKeyToCSSSelector : function(key) {
		var tagFilter = new RegExp("^\\w+");
		var idFilter = new RegExp("#\\w+");
		var classFilter = new RegExp("\\.\\w+");
	
		var element = {};
		element['tag'] = tagFilter.exec(key) || 'div';
		element['id'] = (idFilter.exec(key) || '').toString().replace('#', '') ;
		element['class'] = (classFilter.exec(key) || '').toString().replace('.', '') || '';
	
		element['start'] = '';
		element['start'] += element['tag'];
		element['start'] += element['id'] == '' ? '' : ' id="' + element['id'] + '"';
		element['start'] += element['class'] == '' ? '' : ' class="' + element['class'] + '"';
		
		return element;
	}
}