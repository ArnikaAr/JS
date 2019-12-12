"use strict";

document.addEventListener("DOMContentLoaded", function () {
    var dropZone = document.querySelector('.dropzone');
    var resultZone = document.querySelector('.result');
    var startBtn = document.querySelector('button');
    var progressBar = document.querySelector('#progress-bar');
    var filesArr = [];
    var currentChunk = 0;
    var currentIndex = 0;
    var isStop = false;
    var isFirstEnter = true;
    var regForColor = /(#[a-f0-9]{6})|(#[a-f0-9]{3})|(rgba?\s*\((\s*([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\s*,){2}\\s*([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\s*(,\s*[01](\s*.\s*[0-9]*)?)?\))|(hsla?\s*\(\s*([0-9]|([1-9][0-9])|[12][0-9][0-9]|3[0-5][0-9])\s*(\s*,\s*([0-9]|([1-9][0-9])|100)\s*%){2}\s*(,\s*[01](\s*.\s*[0-9]*)?)?\))/gi;
    var regForNulls = /^\D*\s*0\s*(px|pt|r?em|vh|vw);?$/gm;

    if (typeof window.FileReader == 'undefined') {
        dropZone.text('Не поддерживается браузером!');
    }

    dropZone.addEventListener('dragenter', dragEnter, false);
    dropZone.addEventListener('dragleave', dragLeave, false);
    dropZone.addEventListener('dragover', dragOver, false);
    dropZone.addEventListener('drop', onDrop, false);

    function dragEnter(event) {
        event.preventDefault ? event.preventDefault() : event.returnValue = false;
        dropZone.style.backgroundColor = '#EFFFB2';
    }

    function dragLeave(event) {
        event.preventDefault ? event.preventDefault() : event.returnValue = false;
        dropZone.style.backgroundColor = 'white';
    }

    function dragOver(event) {
        event.preventDefault ? event.preventDefault() : event.returnValue = false;
    }

    function onDrop(event) {
        event.preventDefault ? event.preventDefault() : event.returnValue = false;
        event.stopPropagation();
        event.target.style.background = "";
        progressBar.value = 0;
        var files = event.dataTransfer.files;
        dropZone.innerHTML = ' ';
        resultZone.innerHTML = ' ';
        startBtn.textContent = 'Start';
        currentChunk = 0;
        currentIndex = 0;
        checkFiles(files);
    }

    function checkFiles(files) {
        filesArr = files.filter(function (elem) {
            return elem.type.indexOf('image') != -1 || elem.type.indexOf('css') != -1;
        });
        filesArr.forEach(function (elem) {
            getPreviews(elem, dropZone);
        });
        startBtn.addEventListener('click', function (event) {
            if (!isStop) {
                if (currentIndex === 0 && currentChunk === 0 && isFirstEnter) {
                    divideByChunks(filesArr[currentIndex]);
                    isFirstEnter = false;
                } else {
                    isStop = true;
                }
            } else {
                isStop = false;
                divideByChunks(filesArr[currentIndex], currentChunk);
            }
        });
    }

    function divideByChunks(file, start) {
        if (!isFirstEnter) {
            dropZone.removeEventListener('dragenter', dragEnter, false);
            dropZone.removeEventListener('dragleave', dragLeave, false);
            dropZone.removeEventListener('dragover', dragOver, false);
            dropZone.removeEventListener('drop', onDrop, false);

            window.onbeforeunload = function () {
                return "Would you like to navigate away?";
            };
        }

        var size = file.size;
        var lastChunk;

        if (start === undefined) {
            start = 0;
        }

        var end = start + CHUNK_SIZE;

        if (size - end < 0) {
            end = size;
        }

        var chunkSlice = file.slice(start, end);

        if (end < size) {
            lastChunk = false;
            uploadFile(file, chunkSlice, start, lastChunk);
        } else {
            lastChunk = true;
            uploadFile(file, chunkSlice, start, lastChunk);
        }
    }

    function uploadFile(file, chunkSlice, start, lastChunk) {
        if (!isStop) {
            var url = ENDPOINT_URL;
            var xhr = new XMLHttpRequest();
            var formData = new FormData();
            progressBar.value = Math.ceil(start / file.size * 100);
            xhr.open('POST', url, true);
            xhr.addEventListener('readystatechange', function (e) {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    console.log('Data is saved');

                    if (!lastChunk) {
                        divideByChunks(file, start += CHUNK_SIZE);
                    } else {
                        var index = filesArr.indexOf(file) + 1;

                        if (filesArr[index]) {
                            divideByChunks(filesArr[index]);
                        }

                        var _url = JSON.parse(xhr.response);

                        if (file.type.indexOf('image') !== -1) {
                            previewsPhoto(_url.fileUrl, resultZone);
                        } else {
                            previewsCss(file, resultZone);
                        }

                        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(function (eventName) {
                            dropZone.addEventListener('dragenter', dragEnter, false);
                            dropZone.addEventListener('dragleave', dragLeave, false);
                            dropZone.addEventListener('dragover', dragOver, false);
                            dropZone.addEventListener('drop', onDrop, false);
                        });
                    }
                } else if (xhr.readyState === 4 && xhr.status != 200) {
                    console.error('Data is not saved');
                }
            });
            formData.append('name', file.name);
            formData.append('start', start);
            formData.append('lastChunk', lastChunk);
            formData.append('chunk', chunkSlice);
            xhr.send(formData);
        } else {
            currentIndex = filesArr.indexOf(file);
            currentChunk = start;
        }
    }

    function getPreviews(file, parent) {
        if (file.type.indexOf('image') != -1) {
            previewsPhoto(file, parent);
        } else if (file.type.indexOf('css') != -1) {
            previewsCss(file, parent);
        }
    }

    function previewsPhoto(elem, parent) {
        if (parent.classList.contains('result')) {
            var previewBlock = document.createElement('div');
            var img = document.createElement('img');
            img.src = elem;
            var link = document.createElement('a');
            link.href = elem;
            link.target = '_blank';
            link.append(img);
            link.classList.add('previewsImg');
            previewBlock.append(link);
            parent.append(previewBlock);
        } else {
            var reader = new FileReader();
            reader.readAsDataURL(elem);

            reader.onload = function () {
                var previewBlock = document.createElement('div');
                var previewInfo = document.createElement('div');
                previewInfo.classList.add('previewInfo');
                var name = document.createElement('p');
                name.classList.add('previewName');
                name.append(elem.name);
                var size = document.createElement('p');
                size.classList.add('previewSize');
                size.append('Size: ' + (elem.size / 1024).toFixed(2));
                previewBlock.classList.add('previews');
                var img = document.createElement('img');
                var dataURL = reader.result;
                img.src = dataURL;
                var link = document.createElement('a');
                link.href = dataURL;
                link.append(img);
                link.classList.add('previewsImg');
                previewInfo.append(name);
                previewInfo.append(size);
                previewBlock.append(link);
                previewBlock.append(previewInfo);
                parent.append(previewBlock);
            };
        }
    }

    function previewsCss(elem, parent) {
        var reader = new FileReader();
        reader.readAsText(elem);

        reader.onload = function () {
            var previewBlock = document.createElement('h2');
            previewBlock.classList.add('previews');
            var nulls = reader.result.match(regForNulls);
            var colors = reader.result.match(regForColor);
            var uniqueColors = colors.filter(function (v, i, a) {
                return a.indexOf(v) === i;
            });
            uniqueColors.forEach(function (elem) {
                var item = document.createElement('pre');
                item.append(elem);
                previewBlock.append(elem);
            });
            nulls.forEach(function (elem) {
                var item = document.createElement('pre');
                item.append(elem);
                previewBlock.append(elem);
            });
            parent.append(previewBlock);
        };
    }
});