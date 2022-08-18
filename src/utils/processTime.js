/**
 * 处理RFC3339时间
 * @param time 
 */
 export default function processTime(time) {
    return new Date(time).toLocaleString();
}