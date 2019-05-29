TypeScript "pdf.js" Disable Worker Demo
========================================

在pdfjs中，为了性能考虑，要求我们一定要提供某种方式的worker（比如一个worker的url，或者shared worker的port），
否则的话，会报错：

```
No "GlobalWorkerOptions.workerSrc" specified.
```

但是在某些极端环境中，我们无法提供worker，终于找到了禁用worker的办法，就是给它一个错误的url，它获取不到的话，
就会内部使用一个fake worker，利用浏览器的主线程来render。虽然慢，但是好在总算能用了。

```
npm install
npm run demo
```
